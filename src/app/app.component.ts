import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  title = 'Portifolio';
  json_pretty!: string;

  birth = new Date(1997, 11, 7);
  init_exp = new Date(2017, 8, 2);

  constructor() {
    this.json_pretty = this.syntaxHighlight(
      JSON.stringify(
        {
          full_name: 'Ricardo Poncio',
          age: Math.abs(new Date(Date.now() - this.birth.getTime()).getUTCFullYear() - 1970),
          civil_state: 'Married',
          occupation: 'Analyst Developer',
          city: 'Curitiba/PR',
          country: 'Brazil',
          main_back_lang: 'Java',
          main_fron_lang: 'Angular',
          main_sgdb: 'PostgreSQL',
          years_of_exp: Math.abs(new Date(Date.now() - this.init_exp.getTime()).getUTCFullYear() - 1970),
          objective: 'Software Architect'
        },
        null,
        4
      )
    );
  }

  ngOnInit = () => {};

  syntaxHighlight = (json: any) => {
    if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 4);
    }
    json = json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match: string) => {
        var cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }

        if (cls === 'key')
          return '<span class="' + cls + '">' + match.substring(0, match.indexOf(':')) + '</span>:';
        else
          return '<span class="' + cls + '">' + match + '</span>';
      }
    );
  };
}
