import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements AfterViewInit{
  title = 'landingPage';

  cDateMillisecs: any;
  tDateMillisecs: any;
  currentDate: any;
  targetDate: any;
  difference: any;
  seconds: any;
  minutes: any;
  hours: any;
  days: any;  

  myTimer() {
    this.currentDate = new Date();
    this.targetDate = new Date(2022, 9, 19, 17);
    this.cDateMillisecs = this.currentDate.getTime();
    this.tDateMillisecs = this.targetDate.getTime();
    
    this.difference = this.tDateMillisecs - this.cDateMillisecs;
    this.seconds = Math.floor(this.difference / 1000);
    this.minutes = Math.floor(this.seconds / 60);
    this.hours = Math.floor(this.minutes / 60);
    this.days = Math.floor(this.hours / 24);

    this.hours %= 24;
    this.minutes %= 60;
    this.seconds %= 60;
    this.hours = this.hours < 10 ? '0' + this.hours : this.hours;
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;

    document.getElementById('days')!.innerText = this.days +" días";
    document.getElementById('hours')!.innerText = this.hours +" horas";
    document.getElementById('mins')!.innerText = this.minutes +" minutos";
    document.getElementById('seconds')!.innerText = this.seconds +" segundos";

    setInterval(this.myTimer, 1000);
  }


  ngOnInit(){
    localStorage.setItem('idAnt', 'nulo');
    localStorage.setItem('menuActivated', 'false');
    localStorage.setItem('posAnt', '-1');

    let header = document.getElementById('header') as HTMLElement;
    let menu = document.getElementById('menu-mobile') as HTMLElement;
    let logoToggle = document.getElementById('toggle-icon') as HTMLElement;
    let lastScroll = 0;
    
    window.addEventListener('scroll', function(){
      let scrollActual = window.scrollY;
    
      if(scrollActual > 70){    
        if(scrollActual > lastScroll){    
          header.classList.add('scroll-up');
          header.classList.remove('scroll-down');


          if(header.classList.contains('menuActivated')){
            header.classList.toggle('menuActivated');
            menu.style.top = "-100vh";
            logoToggle.style.filter = "invert(0%)"
            localStorage.setItem('menuActivated', 'false');
          }

        }
        else{
          header.classList.add('scroll-down');
          header.classList.remove('scroll-up');
        }

        lastScroll = scrollActual;
      }
    });
  }

  ngAfterViewInit() {
    this.myTimer();
  }

  toggleMenu(){
    let menu = document.getElementById('menu-mobile') as HTMLElement;
    let header = document.getElementById('header') as HTMLElement;
    let logoToggle = document.getElementById('toggle-icon') as HTMLElement;
    let boolean = localStorage.getItem('menuActivated');


    if(boolean === 'false'){
      header.classList.toggle('menuActivated');
      menu.style.top = "calc(0vh + 90px)";
      logoToggle.style.filter = "invert(100%)";
      localStorage.setItem('menuActivated', 'true');
    }

    else{
      header.classList.toggle('menuActivated');
      menu.style.top = "-150vh";
      logoToggle.style.filter = "invert(0%)";
      localStorage.setItem('menuActivated', 'false');
    }
  }


  toggleMenuClose(){
    let menu = document.getElementById('menu-mobile') as HTMLElement;
    let header = document.getElementById('header') as HTMLElement;
    let logoToggle = document.getElementById('toggle-icon') as HTMLElement;

    if(header.classList.contains('menuActivated')){
      header.classList.toggle('menuActivated');
      menu.style.top = "-150vh";
      logoToggle.style.filter = "invert(0%)";
      localStorage.setItem('menuActivated', 'false');
    }
  }

  rotate(pos:string){

    let ve = document.getElementById('speakers-layout') as HTMLElement;

    console.log(pos + "   " + localStorage.getItem('posAnt'));

    if(localStorage.getItem('posAnt') !== pos && localStorage.getItem('posAnt') != '-1'){

      let element = ve.children[Number(pos)].children[0] as HTMLElement;
      (element.children[0] as HTMLElement).style.transform = "perspective(600px) rotateY(180deg)";
      (element.children[1] as HTMLElement).style.transform = "perspective(600px) rotateY(360deg)";

      
      let element2 = ve.children[Number(localStorage.getItem('posAnt'))].children[0] as HTMLElement;
      (element2.children[0] as HTMLElement).style.transform = "perspective(600px) rotateX(360deg)";
      (element2.children[1] as HTMLElement).style.transform = "perspective(600px) rotateY(180deg)";
      localStorage.setItem('posAnt', pos);

    }

    else if (localStorage.getItem('posAnt') === pos && localStorage.getItem('posAnt')){
      let element = ve.children[Number(pos)].children[0] as HTMLElement;
      (element.children[0] as HTMLElement).style.transform = "perspective(600px) rotateX(360deg)";
      (element.children[1] as HTMLElement).style.transform = "perspective(600px) rotateY(180deg)";

      localStorage.setItem('posAnt', '-1');

    }

    else{
      let element = ve.children[Number(pos)].children[0] as HTMLElement;
      (element.children[0] as HTMLElement).style.transform = "perspective(600px) rotateY(180deg)";
      (element.children[1] as HTMLElement).style.transform = "perspective(600px) rotateY(360deg)";

      localStorage.setItem('posAnt', pos);
    }
  }


  expand(id:string){

    let idAnt:string|null = localStorage.getItem('idAnt');
    let newElement = document.getElementById(id);
    let lastElement = document.getElementById(String(localStorage.getItem('idAnt')));


    if(id != idAnt){
      if(idAnt != 'nulo'){
        if(idAnt == 'divOperaciones'){
          if(lastElement?.classList.contains('card-team-expanded2')){
            lastElement?.classList.toggle('card-team-expanded2');
            let tempFront = lastElement?.children[0];
            let tempBack = lastElement?.children[1];
            tempFront?.classList.toggle('d-none');
            tempBack?.classList.toggle('d-none');
          }
        }

        else{
          if(lastElement?.classList.contains('card-team-expanded')){
            lastElement.classList.toggle('card-team-expanded');
            let tempFront = lastElement?.children[0];
            let tempBack = lastElement?.children[1];
            tempFront?.classList.toggle('d-none');
            tempBack?.classList.toggle('d-none');
          }    
        }
      }

      if(id == 'divOperaciones')
        newElement?.classList.toggle('card-team-expanded2');
      
      else
        newElement?.classList.toggle('card-team-expanded');
      

      let tempFront = newElement?.children[0];
      let tempBack = newElement?.children[1];
      tempFront?.classList.toggle('d-none');
      tempBack?.classList.toggle('d-none');

      localStorage.setItem('idAnt', id);
    }

    else{

      if(id == 'divOperaciones')
        newElement?.classList.toggle('card-team-expanded2');
      
      else
        newElement?.classList.toggle('card-team-expanded');
      
      let tempFront = newElement?.children[0];
      let tempBack = newElement?.children[1];
      tempFront?.classList.toggle('d-none');
      tempBack?.classList.toggle('d-none');
    }
  }

  scroll(e:Event, to:string){
    e.preventDefault();
    (document.getElementById(to) as HTMLElement).scrollIntoView();
  }
}
