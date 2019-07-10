{
  "targets": [{
    "target_name": "testModule",
    "include_dirs" : [
      "srcTest",
      "<!(node -e \"require('nan')\")"
    ],
    "sources": [
      "srcTest/index.cc",
      "srcTest/Vector.cc"
    ]
  },{
    "target_name": "eccModule",
    "defines": [
        "uECC_SUPPORTS_secp256k1"
    ],
    "include_dirs" : [
      "src",
      "<!(node -e \"require('nan')\")"
    ],
    "sources": [
      "src/uECC.c", 
      "src/keccak256.c", 
      "src/ethers.c",
      "src/CMECC.cc",
      "src/index.cc"
    ]
  }]
}
