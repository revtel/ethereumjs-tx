/* Copyright 2014, Kenneth MacKay. Licensed under the BSD 2-clause license. */

#include "uECC.h"

#include <stdio.h>
#include <string.h>

// msgHash 1f 51 bb b0 33 fd d1 5d 5b 93 48 d4 2e 76 8f 85 da 60 88 49 63 ff f0 3c a8 2e 09 5f 19 6c 4e f0
// privateKey 1e04c9cf4195bc6791a1e25d55be2c8332d0b87df1ba6ca4ed9415452fe715df
void printBytes(uint8_t *bytes, int length) {
  printf("'");
  for (int i = 0; i < length; i++) {
    printf("%02x", bytes[i]);
  }
  printf("',\n");
}

void ethSignTest() {
    uint8_t private[32] = {
      0x1e, 0x04, 0xc9, 0xcf, 0x41, 0x95, 0xbc, 0x67, 
      0x91, 0xa1, 0xe2, 0x5d, 0x55, 0xbe, 0x2c, 0x83,
      0x32, 0xd0, 0xb8, 0x7d, 0xf1, 0xba, 0x6c, 0xa4,
      0xed, 0x94, 0x15, 0x45, 0x2f, 0xe7, 0x15, 0xdf
    };
    uint8_t public[64] = {0};
    uint8_t hash[32] = {
      0x1f, 0x51, 0xbb, 0xb0, 0x33, 0xfd, 0xd1, 0x5d, 
      0x5b, 0x93, 0x48, 0xd4, 0x2e, 0x76, 0x8f, 0x85, 
      0xda, 0x60, 0x88, 0x49, 0x63, 0xff, 0xf0, 0x3c, 
      0xa8, 0x2e, 0x09, 0x5f, 0x19, 0x6c, 0x4e, 0xf0
    };
    uint8_t sig[64] = {0};
    const struct uECC_Curve_t * curve = uECC_secp256k1();

    if (!uECC_sign(private, hash, sizeof(hash), sig, curve)) {
        printf("uECC_sign() failed\n");
        return;
    }

    printBytes(sig, 64);
}

int main() {
  for (int i = 0; i < 10; i++) {
    ethSignTest();
  }
  return 0;
}


