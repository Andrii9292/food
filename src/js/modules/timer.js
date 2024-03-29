function timer(id, deadline) {
  
  function getTimeRemaining(deadline) {
    let days, hours, minutes, seconds;
    const t = Date.parse(deadline) - new Date()
    if(t <= 0) {
      days = 0
      hours = 0
      minutes = 0
      seconds = 0
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24))
      hours = Math.floor((t / (1000 * 60 * 60)) % 60)
      minutes = Math.floor((t / (1000 * 60) % 60))
      seconds = Math.floor((t / 1000 % 60))
    }
    
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    }
  }
  
  function getZero(num) {
    if(num >= 0 && num < 10) {
      return `0${num}`
    } else return num
  }
  
  function setClock(selector, deadline) {
    const timer = document.querySelector(selector)
    const days = timer.querySelector('#days')
    const hours = timer.querySelector('#hours')
    const minutes = timer.querySelector('#minutes')
    const seconds = timer.querySelector('#seconds')
    const timeInterval = setInterval(updateClock, 1000)
    
    updateClock()
    
    function updateClock() {
      const t = getTimeRemaining(deadline)
      days.innerHTML = getZero(t.days)
      hours.innerHTML = getZero(t.hours)
      minutes.innerHTML = getZero(t.minutes)
      seconds.innerHTML = getZero(t.seconds)
      
      if(t.total <= 0) {
        clearInterval(timeInterval)
      }
    }
  }
  
  setClock(id, deadline)
}

export default timer