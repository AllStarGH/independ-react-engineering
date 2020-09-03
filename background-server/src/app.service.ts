import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
	  let welcomeHtml = '<div style="text-align:center;color:#111000;padding:1rem 0 0 0;">';
	  welcomeHtml += '<br/>';
	  welcomeHtml += '<h2>';
	  welcomeHtml += '<i>';
	  welcomeHtml += 'Hello Fantasy World!';
	  welcomeHtml += '</i>';
	  welcomeHtml += '</h2>';
	  welcomeHtml += '</div>';
    return welcomeHtml;
  }
}
