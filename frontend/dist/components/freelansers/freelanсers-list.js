import config from "../../config/config";
import { HttpUtils } from "../../utils/http-utils";

export class FreelanсersList {
   constructor(openNewRoute) {
      this.openNewRoute = openNewRoute;
      this.getFreelancers().then()
   }

   async getFreelancers() {

      try {
         const result = await HttpUtils.request('/freelancers');
         if (result.redirect) {
            return this.openNewRoute(result.redirect)
         }
         if (result.error || !result.response || (result.response && (result.response.error || !result.response.freelancers))) {
            throw new Error("Возникла ошибка при запросе фрилансеров. Обратитесь в поддержку");
         }
         this.showRecords(result.response.freelancers);
      } catch (e) {
         console.log(e)
      }

   }

   showRecords(freelancers) {
      const recordsElement = document.getElementById('records');
      for (let i = 0; i < freelancers.length; i++) {
         let trElement = document.createElement('tr');
         trElement.insertCell().innerText = i + 1;
         trElement.insertCell().innerHTML = freelancers[i].avatar ? `<img class="freelancer-avatar"src="${config.host}${freelancers[i].avatar}" alt="user image">` : '';
         trElement.insertCell().innerText = freelancers[i].name + ' ' + freelancers[i].lastName;
         trElement.insertCell().innerText = freelancers[i].email;
         let levelHtml = null;

         switch (freelancers[i].level) {
            case config.freelancerLevels.junior:
                levelHtml = '<span class="badge badge-info">Junior</span>';
                break;
            case config.freelancerLevels.middle:
                levelHtml = '<span class="badge badge-warning">Middle</span>';
                break;
            case config.freelancerLevels.senior:
                levelHtml = '<span class="badge badge-success">Senior</span>';
                break;
            default:
                levelHtml = '<span class="badge badge-secondary">Unknown</span>';
        }

         trElement.insertCell().innerHTML = levelHtml;
         trElement.insertCell().innerText = freelancers[i].education;
         trElement.insertCell().innerText = freelancers[i].location;
         trElement.insertCell().innerText = freelancers[i].skills;
         trElement.insertCell().innerHTML = '<div class="freelancer-tools">' +
            '<a href= "/freelancers/view?id="' + freelancers[i].id + ' class="fas fa-eye"></a>' +
            '<a href= "/freelancers/edit?id="' + freelancers[i].id + ' class="fas fa-edit"></a>' +
            '<a href= "/freelancers/delete?id="' + freelancers[i].id + ' class="fas fa-trash"></a>' +
            '</div>';
            recordsElement.appendChild(trElement);
      }
   }
}