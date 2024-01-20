"use client";

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js'
import { paypalCheckPayment, setTransactionId } from '@/actions';

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ amount, orderId }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = ( Math.round( amount * 100 )) / 100;

  if( isPending ) {
    return (
      <div className='animate-pulse mb-16'>
        <div className='h-11 bg-gray-300 rounded' />
        <div className='h-11 bg-gray-300 rounded mt-2' />
      </div>
    );
  }

  const createOrder = async ( data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId, // Esto se necesita agregar para que PayPal sepa que producto está pagado.
          amount: {
            value: `${ roundedAmount }`,
            // currency_code: 'USD', // Así está por defecto
          }
        }
      ]
    });

    const { ok, message } = await setTransactionId( transactionId, orderId );

    if( !ok ) {
      throw new Error( message );
    }

    return transactionId;
  };

  const onApprove = async ( data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if( !details ) return;

    await paypalCheckPayment( details.id );
  };

  return (
    <div className='relative z-0'>
      <PayPalButtons 
        createOrder={ createOrder }
        onApprove={ onApprove }
      />
    </div>
  )
}
