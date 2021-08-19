// import chaiModule from 'chai';
import chaiModule = require('chai');
import {chaiEthers} from 'chai-ethers';
chaiModule.use(chaiEthers);
export = chaiModule;