#! /bin/bash

if [[ $1 == 'build' ]]; then
  echo "building test_ecdsa..."
  gcc -DuECC_SUPPORTS_secp160r1 -DuECC_SUPPORTS_secp192r1 -DuECC_SUPPORTS_secp224r1 -DuECC_SUPPORTS_secp256r1 -DuECC_SUPPORTS_secp256k1 test/test_ecdsa.c uECC.c 
  echo 
fi 

if [[ $1 == 'test' ]]; then
  echo "building test_ecdsa..."
  gcc -DuECC_SUPPORTS_secp160r1 -DuECC_SUPPORTS_secp192r1 -DuECC_SUPPORTS_secp224r1 -DuECC_SUPPORTS_secp256r1 -DuECC_SUPPORTS_secp256k1 test/test_ecdsa.c uECC.c && ./a.out
  echo 
fi 

if [[ $1 == 'test-eth' ]]; then
  echo "building test_eth_sign..."
  gcc -DuECC_SUPPORTS_secp256k1 test/test_eth_sign.c uECC.c keccak256.c ethers.c && ./a.out
  echo 
fi
 
echo "done"
