import {Component} from '@angular/core';
import {LINKS} from "../../_static/links";
import {Link, LINK_KEYS} from "../../shared/types/link.type";
import {ResourceList} from "../../shared/types/any.type";

@Component({
  selector: 'note-list',
  templateUrl: './online-video-list.component.html',
  styleUrls: ['./online-video-list.component.css']
})
export class OnlineVideoListComponent {

  constructor() {}

  get newResources(): ResourceList {
    let resources = LINKS;
    resources.map((value:Link) =>  {
      value.descriptor = "<iframe width=\"560\" height=\"315\" src=\"" + value.url + "\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
    })

    return resources;
  }

  get columns() {
    return LINK_KEYS;
  }
}
