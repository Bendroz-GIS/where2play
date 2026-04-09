
function zoomTo(view, coordinates, level) {
  view.animate({
    center: coordinates,
    duration: 1000,
    zoom: level
  })
}

export { zoomTo }