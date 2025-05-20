let video;

/** @type {ml5.HandPose} */
let handPose;

/** @type {ml5.Hand[]} */
let hands = [];

function preload() {
  // Load the handPose model
  handPose = ml5.handPose({
    flipped: true,
  });
}

function setup() {
  const scale = 2;
  createCanvas(640 * scale, 480 * scale);
  // Create the webcam video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.size(width, height);
  video.hide();

  // start detecting hands from the webcam video
  handPose.detectStart(video, function (results) {
    hands = results;
  });
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // // Draw all the tracked hand points
  // for (let i = 0; i < hands.length; i++) {
  //   let hand = hands[i];
  //   for (let j = 0; j < hand.keypoints.length; j++) {
  //     let keypoint = hand.keypoints[j];
  //     fill(0, 255, 0);
  //     noStroke();
  //     circle(keypoint.x, keypoint.y, 10);
  //   }
  // }

  //

  strokeWeight(4);

  const mano_1 = hands[0];
  if (!mano_1) return;

  const mano_1_pollice = mano_1.keypoints[4];
  const mano_1_indice = mano_1.keypoints[8];

  stroke(255, 0, 0);
  line(mano_1_pollice.x, mano_1_pollice.y, mano_1_indice.x, mano_1_indice.y);

  const mano_2 = hands[1];
  if (!mano_2) return;

  const mano_2_pollice = mano_2.keypoints[4];
  const mano_2_indice = mano_2.keypoints[8];

  stroke(0, 0, 255);
  line(mano_2_pollice.x, mano_2_pollice.y, mano_2_indice.x, mano_2_indice.y);

  stroke(255, 255, 0);
  line(mano_1_pollice.x, mano_1_pollice.y, mano_2_pollice.x, mano_2_pollice.y);

  stroke(0, 255, 0);
  line(mano_1_indice.x, mano_1_indice.y, mano_2_indice.x, mano_2_indice.y);
}
