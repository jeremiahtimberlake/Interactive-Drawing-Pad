// Lab 2 Assignment - Interactive Pen Sketch

// My intention for this sketch was to expand the sample code from the interactive pen sketch into a full drawing pad. Alongside the pen tool, I added text, flower, eraser, delete, and color selection tools.

// icons: https://fonts.google.com/icons?icon.size=24&icon.color=%23FFFFFF

// drawing tools'
let drawTool;
let drawToolPressed;
let textTool;
let textToolPressed;
let eraserTool;
let eraserToolPressed;
let flowerTool;
let flowerToolPressed;
let deleteTool;
let deleteToolPressed;

// drawing tools' states 
let isDrawToolActive;
let isTextToolActive;
let isEraserToolActive;
let isFlowerToolActive;
let isDeleteToolActive;

// cursors
let drawCursor;
let eraserCursor;

// preload the drawing tools' icons and cursors
function preload() {
  // drawing tools' icons
  drawTool = createImg('images/draw-tool.png', 'image not found');
  drawToolPressed = createImg('images/draw-tool-pressed.png', 'image not found');
  textTool = createImg('images/text-tool.png', 'image not found');
  textToolPressed = createImg('images/text-tool-pressed.png', 'image not found');
  flowerTool = createImg('images/flower-tool.png', 'image not found');
  flowerToolPressed = createImg('images/flower-tool-pressed.png', 'image not found');
  eraserTool = createImg('images/eraser-tool.png', 'image not found');
  eraserToolPressed = createImg('images/eraser-tool-pressed.png', 'image not found');
  deleteTool = createImg('images/delete-tool.png', 'image not found');
  deleteToolPressed = createImg('images/delete-tool-pressed.png', 'image not found'); 
  
  // drawing tools' cursors
  drawCursor = 'images/draw-cursor.png';
  eraserCursor = 'images/eraser-cursor.png';
}

function setup() {
  // create a blank drawing canvas (800x600) with a white background
  createCanvas(800, 600);
  background(255);
  
  // tool bar background
  strokeWeight(0);
  fill('lightgrey');
  rect(0, 0, 45, 600);
  
  // set the positions and initial states of the drawing tools
  drawTool.position(10, 150);
  drawToolPressed.position(10, 150).hide();
  textTool.position(10, 200);
  textToolPressed.position(10, 200).hide();
  flowerTool.position(10, 250);
  flowerToolPressed.position(10, 250).hide();
  eraserTool.position(10, 300);
  eraserToolPressed.position(10, 300).hide();
  deleteTool.position(10, 350);
  deleteToolPressed.position(10, 350).hide();
  
  // respond to a drawing tool being pressed
  drawTool.mousePressed(drawToolActive); 
  textTool.mousePressed(textToolActive);
  eraserTool.mousePressed(eraserToolActive);
  flowerTool.mousePressed(flowerToolActive);
  deleteTool.mouseClicked(deleteToolActive);
  
  // color picker for draw and flower tools
  colorPicker = createColorPicker('purple');
  colorPicker.position(7, 400).size(30);
  colorPicker.style('background-color', 'lightgrey');
  colorPicker.style('border', 'none');
  colorPicker.style('shape-outside', 'circle(45%)');
  
  // slider for draw and erase tools
  slider = createSlider(1, 25, 1).hide();
  
  // text input for text tool
  textInput = createInput('').hide();
  textInput.position(45, 200);
  textInput.size(100);
  typedText = textInput.value();
  textLength = textWidth(typedText);
  textInput.size(textLength);
}

// drawing tools' interactions
function mouseMoved() {
  if (isTextToolActive && mouseX > 45 && mouseY < height - 20) {
    textInput.position(mouseX, mouseY);  
  }
}
function mouseDragged() {
  if (isDrawToolActive && mouseX > 45 && mouseY < height - 20) {
    c = colorPicker.value();
    g = slider.value();
    stroke(c);
    strokeWeight(g);
    line(pmouseX, pmouseY, mouseX, mouseY)
  } else if (isEraserToolActive && mouseX > 45) {
    g = slider.value();
    fill('white');
    noStroke();
    circle(mouseX, mouseY, g)
  }
}
function mousePressed() {
  if (isFlowerToolActive && mouseX > 45) {
    drawFlower(mouseX, mouseY);
  } else if(isDeleteToolActive && mouseX > 45) {
    removeElements();
    reset();
  }
}
function keyPressed() {
    typedText = textInput.value();
    textLength = textWidth(typedText);
    textInput.size(textLength + 10);
  if (keyCode == ENTER) {
    if (isTextToolActive && mouseX > 45 && mouseY < height - 20) {
      let userText = createP(typedText);
      userText.position(mouseX, mouseY);
    }
  }
}

// activate/deactivate drawing tools
function drawToolActive() {
  cursor(drawCursor, 2, 20);
  slider.show();
  textInput.hide();
  drawToolPressed.show();
  isDrawToolActive = true;
  textToolPressed.hide();
  isTextToolActive = false;
  flowerToolPressed.hide();
  isFlowerToolActive = false;
  eraserToolPressed.hide();
  isEraserToolActive = false;
  deleteToolPressed.hide();
  isDeleteToolActive = false;
}  
function textToolActive() {
  cursor(CROSS);
  slider.hide();
  textInput.show();
  textToolPressed.show();
  isTextToolActive = true;
  drawToolPressed.hide();
  isDrawToolActive = false;
  flowerToolPressed.hide();
  isFlowerToolActive = false;
  eraserToolPressed.hide();
  isEraserToolActive = false;
  deleteToolPressed.hide();
  isDeleteToolActive = false;
}
function flowerToolActive() {
  cursor(CROSS);
  slider.hide();
  textInput.hide();
  flowerToolPressed.show();
  isFlowerToolActive = true;
  drawToolPressed.hide();
  isDrawToolActive = false;
  textToolPressed.hide();
  isTextToolActive = false;
  eraserToolPressed.hide();
  isEraserToolActive = false;
  deleteToolPressed.hide();
  isDeleteToolActive = false;
}
function eraserToolActive() {
  cursor(eraserCursor, 2, 20);
  slider.show();
  textInput.hide();
  eraserToolPressed.show();
  isEraserToolActive = true;
  drawToolPressed.hide();
  isDrawToolActive = false;
  textToolPressed.hide();
  isTextToolActive = false;
  flowerToolPressed.hide();
  isFlowerToolActive = false;
  deleteToolPressed.hide();
  isDeleteToolActive = false;
}
function deleteToolActive() {
  cursor(CROSS);
  slider.hide();
  textInput.hide();
  deleteToolPressed.show();
  isDeleteToolActive = true;
  drawToolPressed.hide();
  isDrawToolActive = false;
  textToolPressed.hide();
  isTextToolActive = false;
  flowerToolPressed.hide();
  isFlowerToolActive = false;
  eraserToolPressed.hide();
  isEraserToolActive = false;
}

// draws a single flower for flower tool
function drawFlower(x, y) {
  // pistil
  fill('gold');
  noStroke();
  circle(x, y, 20);
  
  // petals
  c = colorPicker.value();
  fill(c);
  for (i = 0; i < 6; i++) {
    let angle = (i * 60) * PI/180
    
    let petalX = x + cos(angle) * 15;
    let petalY = y + sin(angle) * 15;
    
    circle(petalX, petalY, 12);
  }
}

// reset for delete tool
function reset() {
  // icons
  drawTool = createImg('images/draw-tool.png', 'image not found');
  drawToolPressed = createImg('images/draw-tool-pressed.png', 'image not found');
  textTool = createImg('images/text-tool.png', 'image not found');
  textToolPressed = createImg('images/text-tool-pressed.png', 'image not found');
  flowerTool = createImg('images/flower-tool.png', 'image not found');
  flowerToolPressed = createImg('images/flower-tool-pressed.png', 'image not found');
  eraserTool = createImg('images/eraser-tool.png', 'image not found');
  eraserToolPressed = createImg('images/eraser-tool-pressed.png', 'image not found');
  deleteTool = createImg('images/delete-tool.png', 'image not found');
  deleteToolPressed = createImg('images/delete-tool-pressed.png', 'image not found'); 
  
  // cursors
  drawCursor = 'images/draw-cursor.png';
  eraserCursor = 'images/eraser-cursor.png';
  
  // create a blank drawing canvas (800x600) with a white background
  createCanvas(800, 600);
  background(255);
  
  // tool bar background
  strokeWeight(0);
  fill('lightgrey');
  rect(0, 0, 45, 600);
  
  // set the positions and initial states of the drawing tools
  drawTool.position(10, 150);
  drawToolPressed.position(10, 150).hide();
  textTool.position(10, 200);
  textToolPressed.position(10, 200).hide();
  flowerTool.position(10, 250);
  flowerToolPressed.position(10, 250).hide();
  eraserTool.position(10, 300);
  eraserToolPressed.position(10, 300).hide();
  deleteTool.position(10, 350);
  deleteToolPressed.position(10, 350).hide();
  
  // respond to a drawing tool being pressed
  drawTool.mousePressed(drawToolActive); 
  textTool.mousePressed(textToolActive);
  eraserTool.mousePressed(eraserToolActive);
  flowerTool.mousePressed(flowerToolActive);
  deleteTool.mouseClicked(deleteToolActive);
  
  // color picker for draw tool
  colorPicker = createColorPicker('purple');
  colorPicker.position(7, 400).size(30);
  colorPicker.style('background-color', 'lightgrey');
  colorPicker.style('border', 'none');
  colorPicker.style('shape-outside', 'circle(45%)');
  
  // slider for draw and erase tools
  slider = createSlider(1, 25, 1).hide();
  
  // text input for text tool
  textInput = createInput('').hide();
  textInput.position(45, 200);
}
