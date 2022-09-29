// as solved here: https://gamedev.stackexchange.com/questions/87305/how-do-i-convert-from-cartesian-to-spherical-coordinates/202698#202698
#include ../polar-util.frag;

uniform float uTime;
uniform float uInterval;

void main()
{
float disp = 1.0;
vec3 sphericalPt = toPolar(position);
float intervals = uTime / uInterval;
float tPos = (uTime - floor(intervals) * uInterval) / uInterval;

vec3 sphericalDisp = vec3(
sphericalPt.x + sin((sphericalPt.y + PI + (tPos * PI * 2.0)) * 16.0) * disp,
sphericalPt.y,
sphericalPt.z
);

gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(toCartesian(sphericalDisp), 1.0);
}
