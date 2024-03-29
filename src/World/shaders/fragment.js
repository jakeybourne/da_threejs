export const fragmentShader = `
vec3 rgb(float r, float g, float b) {
  return vec3(r / 255., g / 255., b / 255.);
}

vec3 rgb(float c) {
  return vec3(c / 255., c / 255., c / 255.);
}

varying vec2 vUv;

uniform sampler2D getTexture1;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_time;

void main(void) {

  vec3 c1 = rgb(u_color1.r, u_color1.g, u_color1.b);
  vec3 c2 = rgb(u_color2.r, u_color2.g, u_color2.b);

  vec4 bumpData = texture2D(getTexture1, vUv);
  if(bumpData.a < 0.05) {
      gl_FragColor = vec4(c2, 0.5);
  } else {
      gl_FragColor = ( (bumpData.a)  * (1. - bumpData.r) ) * vec4(c1, 1.) * 0.65;
  }
}
`;