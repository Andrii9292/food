function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  
  modal.classList.add('show')
  modal.classList.remove('hide')
  document.body.style.overflow = 'hidden'
  if(modalTimerId) {
    clearTimeout(modalTimerId)
  }
}

function modalClose(modalSelector) {
  const modal = document.querySelector(modalSelector);
  
  modal.classList.add('hide')
  modal.classList.remove('show')
  document.body.style.overflow = 'unset'
}

function modal(triggerSelector, modalSelector, modalTimerId) {

  const modalTriger = document.querySelectorAll(triggerSelector)
  const modal = document.querySelector(modalSelector)
  
  modalTriger.forEach((btn) => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId))
  })
  
  modal.addEventListener('click', (e) => {
    if(e.target === modal || e.target.getAttribute('data-close') === '') {
      modalClose(modalSelector)
    }
  })
  
  document.addEventListener('keydown', (e) => {
    if(e.code === 'Escape' && modal.classList.contains('show')) {
      modalClose(modalSelector)
    }
  })
  
  function showModalByScroll() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId)
      removeEventListener('scroll', showModalByScroll)
    }
  }
  
  window.addEventListener('scroll', showModalByScroll)
}

export default modal
export {openModal, modalClose}