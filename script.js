
// card Animation
AOS.init({
    once: true,
    duration: 1000, 
    delay: 200,  
  });

  function changeImage(newSrc, clickedThumbnail) {
    document.getElementById('mainImage').src = newSrc;

    // Remove the active class from all thumbnails
    var thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(function(thumb) {
        thumb.classList.remove('thumbnail-active');
    });

    // Add the active class to the clicked thumbnail
    clickedThumbnail.classList.add('thumbnail-active');
}

$(document).on('scroll', function() {
  if ($(window).scrollTop() > 50) {
      $('.transparent-nav').addClass('navbar-scrolled');
  } else {
      $('.transparent-nav').removeClass('navbar-scrolled');
  }
});

$(document).ready(function(){
  $("#mainImage").click(function(){
      let imgSrc = $(this).attr("src");
      $("#popupImage").attr("src", imgSrc);
  });
});
