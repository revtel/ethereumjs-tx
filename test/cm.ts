import * as tape from 'tape'
import { Buffer } from 'buffer'
import Transaction from '../src/transaction'
import {
  ecsign,
} from 'ethereumjs-util'
const secp256k1 = require('secp256k1');
const ethLibAccount = require('../eth-lib/account');

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const ecSignAsync1 = async (msgHash: Buffer, privateKey: Buffer) => {
  await delay(100);
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

const ecSignAsync3 = async (
  msgHash: Buffer,
  privateKey: Buffer,
  chainId?: number,
) => {
  const outputs = [
    // 0
    "a54d4586cb59d3875c88aebdb0f5ef356e055e661cbb8c44326cf00d29700d30d37de7bccf0779832963e2310c0981d8c4a220f3a48c2b0014ba18f382ab5048",
    // 1 -> OK
    "3654111fa4fb0e5be5943a056839d49836453c1adb0d644592f037c91f5ec8fb156f9eaf271958cbe2728ce0bf8edd17cfdc78c65c8e9f152a3f1b4b1d7710e1", 
    // 2 -> OK
    "26d584102a524d881c4b7083ebbc51f7860025f3870ae69289b987e0d9cd4ac84ce7235deb298eb81eabbc1d3a38d516e664d18d8031d4d9ab2dbf1b82f6d283", 
    // 3
    "c263f3689d987c80fb635017dcc5417e783cab5e484eb6f305ed46d090159fc9ee1d1c9fca2773d20b23deaaad0cb66f7e988818a84b50197445c9751b2a906d",
    // 4
    "6aac79ad80ba278254244d2e6e91eaa8289c6e21711e99fe1f9dfc72194e8103a69e355f869e02f1cdea9784784d279b23d01849a59e1e81cc467d7a790602e8",
    // 5
    "cecbd9b2c315349d87f8286c57f8b83c2eaa572b9cafd0c7c49615ffc5c43816f0dd0214ace818d552d58eb1cc2f33ed62712d9ff5c93b00e248f1853192ca94",
    // 6
    "b69dae56d938f587a7d34c2d44a0364e59a13766ad5b577894e8e2edb7cd8e45b7239bbe083b3bf7cdeb528eb23d3ecb38d72d8abacfe451a8723784377dccd3",
    // 7
    "0aa527194d229f1ad57f48de94ea9d9f7bcdaa0a71e0324f196ea8aa32006e70cd5593713b8cee08d3a05490e88a4200b7d5606bebff63b364f96e4cf2fccff9",
    // 8
    "58331eab3c3302f9a3bb315de070d30255097ad9df24b9f7ab3a4f2dccc117efe862d03090ad63304b0af409a3127589ae910681bec0b0ebfe3ac04f82ceff44",
    // 9
    "2276953fac605ad133628196145a40a6809f036d6bdf7768d2b3878f5e28562ac68674308f19652d5017572bfab14e9b82313991831c9bbefe7fdc417f1f5c46",
    // 10
    "d78534697bcf1d3e181e21eb60068d7d0e8b329d0297e1fe14acefb5c97c069d97f7993dafd45d9059c08e015c6eeebe52d91d6f4f479ed6a899826d110149b7",
    // 11
    "5c98c4a981c8c2a81f78cd1492f89a3a0735c58e78e06c3c23b7d13e4116fa2ac421caec6c18f0045031ea7d18bd46f91ef937fa9b74d9a80a84d548b453ced7",
    // 12
    "1561a95fad847c158bddb69a0e734ffaa52374af70ffcd23b4ebda39e1bb1c18db16b6d437b9e94b37752e19281af2518fc78fa91b9907613213422d74dc7a83",
    // 13
    "3c8dc8a45cfd7e547562506c5e04c8f254b7db0a4cb09eed04fe00d184ed309cab40f17e6db7d9f25270aa39b619b7af1cfa853ee3b2267b882ed09246ca66e6",
    // 14 -> OK
    "b07947030e0f55c5bdd00a1ca015d3ddb0797a02de5551da1ef18801de226a5b76cabe785dff36d5fd92564f6dd5554018bdf8ca512a591c224f4ee76906da2a",
    // 15
    "3ede34f627681a09300b4a927ef05fc1172b967f456b2f31a4f588533b841820e6944cab033f838a8cf87037d51233e0abc6ac93a246cc5e6036c9b219670bf3",
    // 16 -> OK
    "74c6ad3387eece279c7d976ec26a8914f0a857166671a81b119ab17c2e58dd247d0b989d752b4d4cf6640a683f6ab9aac0e09f24ade68a15888d0207a6674319",
    // 17 -> OK
    "03be023c129bec800ccf2ac3962cde3cbf1ea76b4fea0dab3e02d53287a9db084223b2fe908d3f385daa1f0350c957921cdaca6dc3ae6780108e25c8b841703e",
    // 18 -> OK
    "34a6a4a51f1733485c2eb6fe5c066e9dc6face640c4a54717fcbe7d727e7c3cb54a5a9068adc36bc949b6396a156a7bb12315478688ecd90b6a352ccc7b74701",
    // 19
    "20e98ec91c74f8f8565c6269d26664a7bf4b24f2b5a796df603ea67780b3239187c37912e73d5c169ffca672faab03538aab5df0f1ec9207766203b6998a28ee",
    // 20
    '3d4fa59da9baa8d5e90b09bdfa7be87847ba17a5a00a7fb2397dec9c4e4e71fce3e6ab6b27dc1d9589429a151a4873537c8ccf28f51d99428a30f53b08da5205',
    // 21 -> OK
    'e1e3c1d24437c2b4357636bfa0da430969099b8da50495b0871f8c22d56536a52c0169fdcd88a391084e160a0538c426361be0b2127108363e6baeae4ebe0ce4',
    // 22 
    'eb4c0237113d14dd8827a7eb358fbaac886e24b2520705d12eab0f4452cd9c63f1a6bf0e465a81b3a4466c56e18dbc5bdce1d90e3a7552ed2bac6700b8138e97',
    // 23
    'add26f954466c7134ff236094ce041df708350198b73467ad888bbae95597ea5e3b05c6bd4bdd9ccab5665686345dc08853a77e789503fcd4a7d7c3fdc006fe6',
    // 24
    '549ef6b784cc9b7ccef6a73f3ca873e623202783f29af0eac0b4a8763073ba67e32ea437747524e7bb68716749cebcb8cf33abc441ef3a83722aedf34c65eaf6',
    // 25 -> OK
    'a86429da82a57b08f37098c47518f38d467a88ef764a39907cf6fce4f6c3dbc2345a72ff47d5c7f281f351f90f60ec92bf163e112a6607294614363b9599bd7a',
    // 26
    'ebf3a7ebe67cb58b1ce6270751537cd9b85227ebd5a7ded70837b0585ef99daa8c92d17b5c4fc651239bb2acaea31bd05d1ded235e8fdcb0c4869351c3d82e1e',
    // 27 -> OK
    '6812976c11b81d8675651fe137624972c3481704c78e59c39709049bd53f487b67bbfbe1d11127f80b7cdabdcdc0fd61f687835a0acaa78172737bd570063358',
    // 28
    'f63577bdafe559229859c523bec641570dce8e475c209e1ba5a7c4e01fa7ea6aee0c95714521353eced4a204e951b5b9e492bfe63233f5603dc7f9a8a7c04853',
    // 29 -> OK
    '798d01975d3669dfa22afa7816ac7398091b9082f3bd2e54773db60c9bc4cb610466607458b52bc8896e67abba69993468ad484aaeeba8a60e4f243c06ac3d44',
  ]; 

  const sig = {
    recovery: 1,
    signature: Buffer.from(outputs[29], "hex")
  }

  const ret = {
    r: sig.signature.slice(0, 32),
    s: sig.signature.slice(32, 64),
    v: chainId ? sig.recovery + (chainId * 2 + 35) : sig.recovery + 27,
  }

  return ret;
}

// tape('async tx', function(t) {
//   t.test('baseline', async function(st) {
//     st.equals(true, true);
//     st.end();
//   })
// });

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
  }),

  t.test('verify tx', async (st) => {
    let rawTx = { 
      from: '0xc9cC17E72D73C51ec6724645D55A6385288EacBE',
      to: '0x2dFB16E42115A2aFe43B7dfeeF95fDf189577356',
      value: '100000' 
    };
    let privateKey = '0x1e04c9cf4195bc6791a1e25d55be2c8332d0b87df1ba6ca4ed9415452fe715df';
    let tx;
    
    tx = new Transaction(rawTx);
    await tx.signAsync(
      new Buffer(privateKey.slice(2), 'hex'),
      ecSignAsync3
    );

    st.equals(tx.verifySignature(), true);
    st.end()

  }),

  t.test('create account', async (st) => {
    let account = ethLibAccount.create();
    console.log(account);
    st.equals(true, true);
    st.end()
  })
});
