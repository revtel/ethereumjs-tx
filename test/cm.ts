import * as tape from 'tape'
import { Buffer } from 'buffer'
import Transaction from '../src/transaction'
import {
  ecsign,
} from 'ethereumjs-util'
const secp256k1 = require('secp256k1');

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const ecSignAsync1 = async (msgHash: Buffer, privateKey: Buffer) => {
  await delay(1000);
  return ecsign(msgHash, privateKey);
}

const ecSignAsync2 = async (
  msgHash: Buffer,
  privateKey: Buffer,
  chainId?: number,
) => {
  console.log('msgHash', msgHash.toString('hex'));
  console.log('privateKey', privateKey.toString('hex'));
  const sig = secp256k1.sign(msgHash, privateKey)
  console.log('sig.recovery', sig.recovery);
  console.log('sig.signature', sig.signature.toString('hex'));
  const recovery: number = sig.recovery;

  const ret = {
    r: sig.signature.slice(0, 32),
    s: sig.signature.slice(32, 64),
    v: chainId ? recovery + (chainId * 2 + 35) : recovery + 27,
  }

  return ret;
}

tape('async tx', function(t) {
  t.test('baseline', async function(st) {
    let rawTx = { 
      from: '0xc9cC17E72D73C51ec6724645D55A6385288EacBE',
      to: '0x2dFB16E42115A2aFe43B7dfeeF95fDf189577356',
      value: '100000' 
    };
    let privateKey = '0x1e04c9cf4195bc6791a1e25d55be2c8332d0b87df1ba6ca4ed9415452fe715df';
    let tx, result, expected;

    tx = new Transaction(rawTx);
    await tx.signAsync(
      new Buffer(privateKey.slice(2), 'hex'),
      ecSignAsync1
    );
    expected = '0x' + tx.serialize().toString('hex');
    console.log('[expected]');
    console.log(expected);

    tx = new Transaction(rawTx);
    await tx.signAsync(
      new Buffer(privateKey.slice(2), 'hex'),
      ecSignAsync2
    );
    result = '0x' + tx.serialize().toString('hex');
    console.log('[actual]');
    console.log(result);

    st.equals(expected, result);
    st.end()
  })
});
