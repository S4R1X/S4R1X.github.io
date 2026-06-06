const canvas = document.getElementById("PlayArea");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "./Cards/Cute/CuteCards - asset pack 0.1update/CuteCards - asset pack/CuteCards_outline.png";

const CARD_W = 100;
const CARD_H = 144;
const COLS = 15;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function getScale() {
  return Math.min(canvas.width / 800, canvas.height / 600);
}

const PlayAreaCoordinates = new Map([
  ["deck", () => [canvas.width / 2, canvas.height / 2]],
  ["left_p2",() => [canvas.width / 2 - (CARD_W *getScale() *0.8), canvas.height / 2 - (CARD_W * getScale() *1.2)]],
  ["right_p2",() => [canvas.width / 2 + (CARD_W *getScale() *0.8), canvas.height / 2 - (CARD_W * getScale() *1.2)]],
  ["left_wild",() => [canvas.width / 2 - (CARD_W *getScale() *1.7), canvas.height / 2]],
  ["right_wild",() => [canvas.width / 2 + (CARD_W *getScale() *1.7), canvas.height / 2]],
  ["left_p1",() => [canvas.width / 2 - (CARD_W *getScale() *0.8), canvas.height / 2 + (CARD_W * getScale() *1.2)]],
  ["right_p1",() => [canvas.width / 2 + (CARD_W *getScale() *0.8), canvas.height / 2 + (CARD_W * getScale() *1.2)]],
]);


function requestCardAt(sheetRow, sheetCol, cx, cy, scale = 1, rotation = 0) {
  const drawScale = getScale() * scale;

  const drawW = CARD_W * drawScale;
  const drawH = CARD_H * drawScale;

  ctx.save();

  ctx.translate(cx, cy); // 👈 center directly
  ctx.rotate(rotation);

  ctx.drawImage(
    img,
    sheetCol * CARD_W,
    sheetRow * CARD_H,
    CARD_W,
    CARD_H,
    -drawW / 2,
    -drawH / 2,
    drawW,
    drawH
  );

  ctx.restore();
}

img.onload = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


requestCardAt(2, 14, PlayAreaCoordinates.get("deck")()[0], PlayAreaCoordinates.get("deck")()[1], 1, Math.PI / 2);
requestCardAt(2, 14, PlayAreaCoordinates.get("right_p2")()[0], PlayAreaCoordinates.get("right_p2")()[1] , 1, Math.PI / 2);
requestCardAt(2, 14, PlayAreaCoordinates.get("left_p2")()[0], PlayAreaCoordinates.get("left_p2")()[1] , 1, Math.PI / 2);
requestCardAt(2, 14, PlayAreaCoordinates.get("left_wild")()[0], PlayAreaCoordinates.get("left_wild")()[1] , 1, Math.PI / 2);
requestCardAt(2, 14, PlayAreaCoordinates.get("right_wild")()[0], PlayAreaCoordinates.get("right_wild")()[1] , 1, Math.PI / 2);
requestCardAt(2, 14, PlayAreaCoordinates.get("right_p1")()[0], PlayAreaCoordinates.get("right_p1")()[1] , 1, Math.PI / 2);
requestCardAt(2, 14, PlayAreaCoordinates.get("left_p1")()[0], PlayAreaCoordinates.get("left_p1")()[1] , 1, Math.PI / 2);

};

function stackCard() {
}