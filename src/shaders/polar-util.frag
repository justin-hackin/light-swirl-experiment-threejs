const float PI = 3.1415926535897932384626433832795028841971693993751058209749;

float getPhi(in float y, in float x)
{
    if (x == 0.0) {
        if (y == 0.0) {
            return 0.0;
        } else if (y > 0.0) {
            return PI/2.0;
        } else {
            return -PI/2.0;
        }
    } else if (x > 0.0) {
        return atan(y/x);
    } else {
        if (y >= 0.0) {
            return atan(y/x) + PI;
        } else {
            return atan(y/x) - PI;
        }
    }
}

vec3 toPolar(in vec3 cart)
{
    float xySquared = (cart.x * cart.x) + (cart.y * cart.y);
    float radius = sqrt(xySquared + (cart.z * cart.z));
    return vec3(radius, atan(sqrt(xySquared), cart.z), getPhi(cart.y, cart.x));
}

vec3 toCartesian(in vec3 sph) {
    return vec3(
        sin(sph.y) * cos(sph.z) * sph.x,
        sin(sph.y) * sin(sph.z) * sph.x,
        cos(sph.y) * sph.x
    );
}
