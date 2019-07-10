/* Copyright 2014, Kenneth MacKay. Licensed under the BSD 2-clause license. */

#include "uECC.h"

#include <stdio.h>
#include <string.h>

int main() {
    int i, c;
    uint8_t private[32] = {0};
    uint8_t public[64] = {0};
    uint8_t hash[32] = {0};
    uint8_t sig[64] = {0};

    const struct uECC_Curve_t * curves[5];
    int num_curves = 0;
#if uECC_SUPPORTS_secp160r1
    printf("support curve 0: secp160r1\n");
    curves[num_curves++] = uECC_secp160r1();
#endif
#if uECC_SUPPORTS_secp192r1
    printf("support curve 1: secp192r1\n");
    curves[num_curves++] = uECC_secp192r1();
#endif
#if uECC_SUPPORTS_secp224r1
    printf("support curve 2: secp224r1\n");
    curves[num_curves++] = uECC_secp224r1();
#endif
#if uECC_SUPPORTS_secp256r1
    printf("support curve 3: secp256r1\n");
    curves[num_curves++] = uECC_secp256r1();
#endif
#if uECC_SUPPORTS_secp256k1
    printf("support curve 4: secp256k1\n");
    curves[num_curves++] = uECC_secp256k1();
#endif
    
    printf("Testing 256 signatures\n");
    for (c = 0; c < num_curves; ++c) {
        for (i = 0; i < 256; ++i) {
            // printf(".");
            fflush(stdout);

            if (!uECC_make_key(public, private, curves[c])) {
                printf("uECC_make_key() failed\n");
                return 1;
            }
            memcpy(hash, public, sizeof(hash));
            
            if (!uECC_sign(private, hash, sizeof(hash), sig, curves[c])) {
                printf("uECC_sign() failed\n");
                return 1;
            }

            if (!uECC_verify(public, hash, sizeof(hash), sig, curves[c])) {
                printf("uECC_verify() failed\n");
                return 1;
            }
        }
        printf("curve %d passed\n", c);
    }
    
    printf("all tests passed\n");
    return 0;
}
