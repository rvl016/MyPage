import { Brick } from './brick';
import { environment } from '../../environments/environment';

export const BRICKS: Brick[] = [
    {
      id : '0',
      name : 'HTML',
      image : environment.baseUrl + '/assets/images/html.png',
      label : 'html',      
      description : 'The basis for a typical webpage.',
      featured : false
    },
    {
      id : '1',
      name : 'CSS',
      image : environment.baseUrl + '/assets/images/CSS.png',
      label : 'css',      
      description : 'A tool for augumenting visuals of classes, ids and tags in your webpage.',
      featured : false
    },
    {
      id : '2',
      name : 'Java Script/Type Script',
      image : environment.baseUrl + '/assets/images/typescript.png',
      label : 'script',      
      description : 'The basis for a interactive webpage.',
      featured : false
    },
    {
      id : '3',
      name : 'Angular',
      image : environment.baseUrl + '/assets/images/Angular.png',
      label : 'angular',      
      description : 'A framework for taking a shorcut that leads to a nice responsive and interactive webpage.',
      featured : true
    }
  ]