import axios from 'axios';
import 'reflect-metadata';
import { CarOnSaleResponseDTO } from '../../../../DTO/CarOnSaleResponse.dto';
import { CarOnSaleClient } from '../CarOnSaleClient';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
require('dotenv').config();

chai.use(sinonChai);

const base_url = process.env.BASE_URL;

describe('Should retrieve Auctions', () => {
  const sandBox = sinon.createSandbox();
  afterEach(() => sandBox.restore());

  let mockedData = {
    items: [
      {
        id: 'someId'
      }
    ],
    page: 'someNumber',
    total: 'someValue'
  } as unknown as CarOnSaleResponseDTO;

  it('Car on Sale Client', (done) => {
    const auction = new CarOnSaleClient();
    const getStub = sandBox
      .stub(axios, 'get')
      .resolves({ data: mockedData }) as CarOnSaleResponseDTO;

    auction
      .getRunningAuctions()
      .then((result: CarOnSaleResponseDTO) => {
        expect(result.items[0]).to.have.property('id');
        expect(getStub).to.have.been.calledOnce;
        expect(getStub).to.have.been.calledWith(
          `${base_url}/v2/auction/buyer/`
        );
        done();
      })
      .catch(done);
  });
});
