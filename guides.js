let guidesBox = document.querySelector('.academic__courses')
let loadingIcon = document.getElementById('loadingIcon')
let findCourses = document.getElementById('findCourses')
let loadingError = document.getElementById('loadingError')


const getGuides = async () => {

    loadingIcon.style.display = 'block'
    loadingError.style.display = 'none'
    findCourses.style.display = 'none'
  
    await fetch('https://www.alura.com.br/api/dashboard/de7ff896103662b18d918efdbd830af9db047fec92ac01a47594b50f221dbd30')
    .then( async (res) => {
        
        res = await res.json()
        console.log(res)

        // If have courses
        if(res.guides.length > 0){

            hideLoading()
            guidesBox.innerHTML = ''

            res.guides.forEach(element => {
            

                let elementHTML = `
                
                    <div class="academic__courses__box">
                        <ul class="academic__courses__list">
                            <li class="academic__courses__item" style="background-color: ${element.color};">
                                <img class="academic__courses__item__img" src="assets/Alura.jpg">
                            </li>
                            <li class="academic__courses__item"><h4 class="academic__courses__item__title">${element.name}</h4></li>
                            <li class="academic__courses__item"><p class="academic__courses__item__subtitle">Progresso: ${element.finishedSteps} / ${element.totalSteps}</p></li>
                        </ul>
                    </div>

                `


                guidesBox.innerHTML += elementHTML

            });

            return

        }

        // If server returned but with some error
        showError()
        return
      
    
    }).catch( async (err) => {
        
        showError()
    
    })
  

}

const showError = () => {
    loadingError.style.display = 'block'
    findCourses.style.display = 'block'
    hideLoading()
}

const hideLoading = () => {
    loadingIcon.style.display = 'none'
}


findCourses.addEventListener('click', getGuides)
getGuides()

