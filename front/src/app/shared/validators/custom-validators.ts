import {AbstractControl, ValidationErrors} from '@angular/forms';

/**
 * Validateurs personnalisés pour les formulaires d'ajout/modification
 */
export class CustomValidators {

  /**
   * Vérifier que la valeur n'est pas vide
   */
  static notEmpty(control: AbstractControl): ValidationErrors | null {
    return ('' || control.value).trim().length !== 0 ? null : {
      notEmpty: true
    };
  }

  /**
   * Vérifier que l'URL est une URL de vidéo YouTube/Dailymotion
   * URL des regex : https://stackoverflow.com/questions/19377262/regex-for-youtube-url, https://stackoverflow.com/questions/12387389/how-to-parse-dailymotion-video-url-in-javascript/15942126
   */
  static videoUrl(control: AbstractControl): ValidationErrors | null {
    let url = (control.value || '');
    return new RegExp("^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\\w\-]+\\?v=|embed\/|v\/)?)([\\w\-]+)$").test(url) ||
            new RegExp("^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?.+$").test(url) ? null : {
      videoUrl: true
    }
  }
}
