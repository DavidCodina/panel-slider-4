/* =============================================================================
                            indicate_slide()
============================================================================= */


function indicate_slide(index){
  const slider_container = document.getElementsByClassName("slider-container")[0];
  const slices           = document.getElementsByClassName("slice");
  const slice_containers = document.getElementsByClassName("slice-container");


  /* ============================
        Reset Animation
  ============================= */


  //////////////////////////////////////////////////////////////////////////////
  //
  //  Initially, I was also doing this:
  //
  //        slices[i].classList.remove("scale-out");
  //
  //
  //  However, this doesn't seem to be necessary.
  //  When we re-add the animation classes (next step), the animation
  //  resets itself without firsst having to remove them.
  //  Consequently, all I'm doing here is removing .active-slide.
  //
  //  Note: I have separated the animation reset and animation class reapplication
  //  into two separate loops merely for clarity. They could be combined into a
  //  single step.
  //
  //////////////////////////////////////////////////////////////////////////////


  for (let i = 0; i < slices.length; i++) {
    slices[i].classList.remove("active-slide");
  }


  /* ============================
      Reapply animation classes.
  ============================= */


  //Adding each class to ALL slices should work because the CSS :nth-child(even)
  //and :nth-child(odd) handles the actual application of the rule.
  for (let i = 0; i < slices.length; i++) {
    slices[i].classList.add("scale-out");
  }


  //For each slice having the same index value, within it's respective slice
  //container, do this...
  for (let i = 0; i < slice_containers.length; i++){
    const slice_container = slice_containers[i];
    const slice           = slice_container.getElementsByClassName("slice")[index];
    slice.classList.remove("scale-out");
    slice.classList.add("active-slide");
  }
}


/* =============================================================================
                            update_image_title()
============================================================================= */


function update_image_title(index, indicator){
  const slider_container = indicator.closest(".slider-container");
  const image_titles     = slider_container.getElementsByClassName("image-title");
  const image_title      = image_titles[index];

  //Remove .active-title from ALL .image-titles
  for (let i = 0; i < image_titles.length; i++){
    image_titles[i].classList.remove("active-title");
  }

  //Add .active-title to the .image-title corresponding to the index parameter.
  image_title.classList.add("active-title");

  // Test:
  // for (let i = 0; i < image_titles.length; i++){
  //   console.log("image title " + i + " classlist: " + image_titles[i].classList);
  // }
  // console.log("");
}


/* =============================================================================
                            update_indicator()
============================================================================= */


function update_indicator(indicator){
  const indicator_container = indicator.closest(".indicator-container");
  const indicators          = indicator_container.getElementsByClassName("indicator");

  //Remove .active-indicator from all indicators within the current indicator container.
  for (let i = 0; i < indicators.length; i++){
    const indicator = indicators[i];
    indicator.classList.remove("active-indicator");
  }

  //Apply active indicator to the current indicator.
  indicator.classList.add("active-indicator");
}


/* =============================================================================
                            initialize_slider()
============================================================================= */


function initialize_slider(){
  //.initialize is applied to <div class="slider-container initialize"> in the HTML.
  //This makes the first image and title to appear.
  //Then we call .click on the first indicator to set it up behind the scenes.
  //Once that's done, we can remove .initialize
  const slider_container = document.getElementsByClassName("slider-container")[0];
  slider_container.getElementsByClassName("indicator")[0].click();

  //Note: I have also added .active-indicator and .active-title in the HTML.
  //This way, we don't have to wait 500ms for them to appear.
  setTimeout(() => { slider_container.classList.remove("initialize");}, 500);
}


/* =============================================================================
                            Event Listeners
============================================================================= */


const indicators = document.getElementsByClassName("indicator");
for (let i = 0; i < indicators.length; i++){
  const indicator = indicators[i];
  indicator.addEventListener('click', function(){
    indicate_slide(i);
    update_indicator(this);
    update_image_title(i, this);
  });
}

window.onload = function(){
  initialize_slider();
}
