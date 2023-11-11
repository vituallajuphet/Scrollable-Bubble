
window.onload = () => {

    const body = document.getElementById("box")
    const contentEl  =document.getElementById("body")
    const content  =document.getElementById("content")

    dragElement(body);
    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
          document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
          elmnt.onmousedown = dragMouseDown;
        }
    
        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          document.onmousemove = elementDrag;
        }
    
        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();

          
        const width = window.innerWidth;
        const scrollWidth = contentEl.scrollWidth - width 
        let offset = elmnt.offsetLeft < 0 ? 0 : 
        elmnt.offsetLeft >=  window.innerWidth - 30  ? window.innerWidth - 30 - 1 :
        elmnt.offsetLeft

        const boxpercent = (offset /  width) * 100
        const offsetWidth  =  ((boxpercent  /  100) * scrollWidth)

            if(offset >= 0) {
                pos1 = pos3 - e.clientX;
                pos3 = e.clientX;
                pos4 = e.clientY;

              elmnt.style.left = ((offset - pos1) ) + "px";
              contentEl.scrollLeft =  offset <=0 ? 0 : offsetWidth + 30
            }
            
        }
    
        const closeDragElement = () => {
          document.onmouseup = null;
          document.onmousemove = null;
        }
      }
  
}
