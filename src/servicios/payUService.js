import axios from 'axios';

export class PayUService
{
    verMetodosDePago() {
        
        return axios.get('https://api.payulatam.com/payments-api/4.0/service.cgi/paymethods');
            
    }
}