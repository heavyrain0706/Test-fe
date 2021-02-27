document.addEventListener("DOMContentLoaded", init)

function init(){
  
    const images = Array.from(document.getElementsByClassName('images__gallery'));
    const imageItems = Array.from(document.querySelectorAll('.images__item')); 
    let date = new Date();
    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
        "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    let imgCount = images.length;
    let noteImgCount = document.querySelector('.notes__img-count');
    let noteDate = document.querySelector('.notes__date');
    let modal = document.querySelector('.modal');
    let modalCloseBtn = document.querySelector('.modal__close');
    let recoveryBtn = document.querySelector('.recovery');
    //массив кнопок для удаления блока с картинкой
    const deleteImgBtns = Array.from(document.querySelectorAll('.images__delete'));
    //массив индексов удаленных блоков, который бужет хранится в сторедже
    const indexToStorage = [];
    //Массив с индексами удаленных блоков со стореджа
    const indexFromStorage = JSON.parse(sessionStorage.getItem('indexDB'));    

    noteImgCount.innerText = `Изображений на странице: ${imgCount}`;
    noteDate.innerText = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} г. ${date.getHours()}:${date.getMinutes()}`;

    //отображение блоков с картинками после перезагрузки страници 
    if(indexFromStorage !== null){
        indexFromStorage.forEach(item => {
        document.getElementById(`${item}`).remove();
      })
    }
    
    images.forEach(image => {
        image.addEventListener('click', () => {
            document.querySelector('.modal__content').children[0].src = image.src;
            modal.classList.add('modal__show');
        })
    })

    //Модалка с картинкой//
    const hideModal = () => {
        modal.classList.remove('modal__show');
        modal.children[0].classList.remove('hide');
      }

    modalCloseBtn.addEventListener('click', () =>{
        modal.children[0].classList.add('hide');
        setTimeout(hideModal, 400);
    })

    window.addEventListener('click', (event) => {
        if(event.target == modal){
          modal.children[0].classList.add('hide');
          setTimeout(hideModal, 400);
        }
      })

      //Удаление картинок//
      const deleteImage = (array, indexToDelete) => {
        let imgToDelete = images[indexToDelete];
        indexToStorage.push(indexToDelete);
        sessionStorage.setItem(`indexDB`, JSON.stringify(indexToStorage));
        imgToDelete.parentNode.remove();
      }

      deleteImgBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            let indexToDelete = deleteImgBtns.indexOf(btn);
            deleteImage(images, indexToDelete);
          })
      })

      //Восстановление картинок
      recoveryBtn.addEventListener('click', () => {
          const fromStorageToRecovery = JSON.parse(sessionStorage.getItem('indexDB'));
          if(fromStorageToRecovery !== null){
            fromStorageToRecovery.forEach(item => {
              let blockToRecovery = imageItems[item];
              document.querySelector('.images').appendChild(blockToRecovery);
            })
          }
      })
}