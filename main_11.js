/*
  Реализуйте форму фильтра товаров в каталоге и список отфильтрованных товаров.
  Используйте шаблонизацию для создания карточек товаров.
  
  Есть массив объектов (дальше в задании), каждый из которых описывает 
  ноутбук с определенными характеристиками.
  
  Поля объекта по которым необходимо производить фильтрацию: size, color, release_date.
  Поля объекта для отображения в карточке: name, img, descr, color, price, release_date.
    
  Изначально есть форма с 3-мя секциями, состоящими из заголовка и группы 
  чекбоксов (разметка дальше в задании). После того как пользователь выбрал 
  какие либо чекбоксы и нажал кнопку Filter, необходимо собрать значения чекбоксов по группам. 
  
  🔔 Подсказка: составьте объект формата
      const filter = { size: [], color: [], release_date: [] }
    
  После чего выберите из массива только те объекты, которые подходят 
  под выбраные пользователем критерии и отрендерите список карточек товаров.
  
  🔔 Каждый раз когда пользователь фильтрует товары, список карточек товаров очищается, 
      после чего в нем рендерятся новые карточки товаров, соответствующих текущим критериям фильтра.
*/

/*
  HTML для формы
  <form class="form js-form">
    <section>
      <h2>Screen size</h2>
      <ul>
        <li><label><input type="checkbox" name="size" value="13"> 13"</label></li>
        <li><label><input type="checkbox" name="size" value="15"> 15"</label></li>
        <li><label><input type="checkbox" name="size" value="17"> 17"</label></li>
      </ul>
    </section>
    <section>
      <h2>Color</h2>
      <ul>
        <li><label><input type="checkbox" name="color" value="white"> white</label></li>
        <li><label><input type="checkbox" name="color" value="gray"> gray</label></li>
        <li><label><input type="checkbox" name="color" value="black"> black</label></li>
      </ul>
    </section>
    <section>
      <h2>Release date</h2>
      <ul>
        <li><label><input type="checkbox" name="release_date" value="2015"> 2015</label></li>
        <li><label><input type="checkbox" name="release_date" value="2016"> 2016</label></li>
        <li><label><input type="checkbox" name="release_date" value="2017"> 2017</label></li>
      </ul>
    </section>
    <button type="submit">Filter</button>
    <button type="reset">Clear</button>
  </form>
*/
const form = document.querySelector('.js-form');
const card = document.querySelector('#js-card');
let filter = { size: [], color: [], release_date: [] };
const output = document.querySelector('#res');
const inputs =Array.from(document.querySelectorAll('input'));
const btnFtr = document.querySelector('.js-btn-ftr');
const btnClr = document.querySelector('.js-btn-clr');
let filtered;
let test;
const laptops = [
    {
      size: 13,
      color: 'white',
      price: 28000,
      release_date: 2015,
      name: 'Macbook Air White 13"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 13,
      color: 'gray',
      price: 32000,
      release_date: 2016,
      name: 'Macbook Air Gray 13"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 13,
      color: 'black',
      price: 35000,
      release_date: 2017,
      name: 'Macbook Air Black 13"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 15,
      color: 'white',
      price: 45000,
      release_date: 2015,
      name: 'Macbook Air White 15"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 15,
      color: 'gray',
      price: 55000,
      release_date: 2016,
      name: 'Macbook Pro Gray 15"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 15,
      color: 'black',
      price: 45000,
      release_date: 2017,
      name: 'Macbook Pro Black 15"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 17,
      color: 'white',
      price: 65000,
      release_date: 2015,
      name: 'Macbook Air White 17"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 17,
      color: 'gray',
      price: 75000,
      release_date: 2016,
      name: 'Macbook Pro Gray 17"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
    {
      size: 17,
      color: 'black',
      price: 80000,
      release_date: 2017,
      name: 'Macbook Pro Black 17"',
      img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
      descr:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
    },
  ];


  form.addEventListener('click', toggleCheck);
  form.addEventListener('submit', renderPC);
  // document.addEventListener('click', close);


  function toggleCheck(event){
      if(!event.target.hasAttribute('checked')){
      event.target.setAttribute('checked', true);
    } else {
      event.target.removeAttribute('checked')
    }
    console.log(event.target);
  }

  function renderPC(event){
       
    event.preventDefault();
    filter = { size: [], color: [], release_date: [] };
    // form.reset();
     inputs.forEach(item=>{
        //  console.log(item.setAttribute('checked', true));
        //  console.log(item.hasAttribute('checked'));
        // console.log(item);
        if (item.hasAttribute('checked')){
            console.log(item);
            console.log(item.getAttribute('name'));
            console.log (typeof(item.getAttribute('name')));
            filter[`${item.getAttribute('name')}`].push(item.getAttribute('value'));
        }
     }) 
    filtered = laptops;    
    test = Object.values(filter).filter(item=>item.length!==0);
    console.log("test.length", test.length);
    if (test.length===0) {
        filtered = []
    }
    for (key in filter){

        if (filter[key].length){
            console.log(key);
            key!=='color'?
            filtered = filtered.filter(item=>{
                return (
                                (item[key]===+filter[key][0]||
                                item[key]===+filter[key][1]||
                                item[key]===+filter[key][2])
                                );
            }):
            filtered = filtered.filter(item=>{
                return (
                                (item[key]===filter[key][0]||
                                item[key]===filter[key][1]||
                                item[key]===filter[key][2])
                                );
            })
        }
    }
    console.log('filtered',filtered);

    const source = card.innerHTML.trim();
      const template = Handlebars.compile(source);
      const markup = filtered.reduce((acc, item)=>acc+template(item),'');
      output.innerHTML = markup;
  }

  // function clear(event){
    // event.preventDefault();
    // console.log('close', event.target===btnClr);
    // filter = { size: [], color: [], release_date: [] };
  //   inputs.forEach(item=>{
  //         item.removeAttribute('checked');   
  //     }
  //  ) 

      // output.innerHTML = '';
  // }