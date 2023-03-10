import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {
  @ViewChild('captchaImage')
  captchaImage!: ElementRef;
  code: string ="";

  ngOnInit() {
    this.generateCaptchaCode();
  }
  
  ngAfterViewInit() {
    const canvas = this.captchaImage.nativeElement;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    // Set font and style for captcha text
    const font = '36px Arial';
    const letterSpacing = 10;
    context.font = font;
    context.textBaseline = 'middle';
    context.fillStyle = 'grey';
    context.width = 60;
    context.height = 60;
  
    // Randomly rotate and blur each character in captcha
    let x = 10;
    for (let i = 0; i < this.code.length; i++) {
      const char = this.code.charAt(i);
  
      // Randomly rotate character
      const angle = (Math.random() - 0.5) * 20;
      const charWidth = context.measureText(char).width;
      const centerX = x + charWidth / 2;
      const centerY = canvas.height / 2;
      context.setTransform(1, 0, 0, 1, centerX, centerY);
      context.rotate(angle * Math.PI / 180);
      context.fillText(char, -charWidth / 2, 0);
      context.setTransform(1, 0, 0, 1, 0, 0);
      
      // Randomly add blur effect to character
      const blurAmount = Math.random() * 4;
      context.filter = `blur(${blurAmount}px)`;
      context.fillText(char, x, canvas.height / 2);
      context.filter = 'none';
  
      x += context.measureText(char).width + letterSpacing;
    }
  }
  

  generateCaptchaCode() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.code = result;
  }
}