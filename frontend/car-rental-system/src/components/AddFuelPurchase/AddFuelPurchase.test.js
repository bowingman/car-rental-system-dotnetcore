/**
 * AddFuelPurchase.test.js
 */
import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter, Route} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'
import {AppProvider} from "../../AppContext/AppContext";
import {AddFuelPurchase} from "./AddFuelPurchase";
import {fakeAPI, setUpVehicles} from "../../setupTests";
const cloneDeep = require('lodash.clonedeep');

const {vehicles} = cloneDeep(setUpVehicles(fakeAPI));

let tree, contextValue;

beforeEach(() => {
  contextValue = {
	vehicles,
	loading: false,
	notification: {
      display: false,
	  message: ''
	}
  };

  tree = (
	<AppProvider value={contextValue}>
	  <MemoryRouter initialEntries={[`/addFuelPurchase/tesla-123`]}>
		<Route path={`/addFuelPurchase/:vehicleID`} render={props => <AddFuelPurchase {...props} />}/>
	  </MemoryRouter>
	</AppProvider>
  );
});

describe('AddFuelPurchase component', () => {
  it('renders all bookings associated with the vehicle found by vehicleID', () => {
	const {getByTestId} = render(tree);
	expect(getByTestId(/^booking-/)).toBeDefined();
  });
});
