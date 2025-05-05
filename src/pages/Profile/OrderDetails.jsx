

// export default OrderDetails;
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import icon from "../../assets/icons/map.png";
import BuyAgain from './onBuyAgain';
import useGetOrder from '../../hooks/useGetOrder';
import SkeletonLoader from '../../components/Loading/SkeletonLoader';

const OrderDetails = () => {
  const { loading, orderData, error } = useGetOrder();

  const copyToClipboard = (order) => {
    const text = `
      المحافظة: ${order.address?.governorate?.name || ''}
      رقم الطلب: ${order.id}
      حالة الطلب: ${order.status}
      التكلفة الإجمالية: ${order.total_with_delivery_price} دينار
    `;
    navigator.clipboard.writeText(text)
      .then(() => toast.success('تم نسخ التفاصيل إلى الحافظة'))
      .catch(() => toast.error('فشل نسخ البيانات'));
  };

  
if (loading) return <SkeletonLoader type="card" count={4} height={120} />;

  // if (error) return <p className="error">{error}</p>;
  if (!orderData?.data?.length) return <p>لا توجد طلبات حاليًا</p>;

  return (
    <div className="order-details-container">
      {orderData.data.map(order => (
        <div key={order.id} className="order-body mb-4">
          <div className="order-header">
            <div className="icons">
              <img src={icon} alt="map" />
            </div>
            <div className="address-1">{order.address?.governorate?.name || 'غير محدد'}</div>
            <div className="address-2">{order.address?.governorate?.name || 'غير محدد'}</div>
          </div>

          <div className="order-info">
            <div className='row justify-between align-items-center'>
              <p className='col-md-5 order-p'>
                <strong>رقم الطلب:</strong> {order.id}
              </p>
              <button
                onClick={() => copyToClipboard(order)}
                className="copy-button col-md-3"
              >
                نسخ التفاصيل
              </button>
            </div>

            <div className="order-time">
              <div className='text-right'>
                <span>الحالة:</span>
                <b>{order.status}</b>
              </div>
              <div className='text-left'>
                <span>الإجمالي مع التوصيل:</span>
                <b>{order.total_with_delivery_price} دينار</b>
              </div>
              <div className='text-right'>
                <span>التوصيل:</span>
                <b>{order.delivery_price} دينار</b>
              </div>
              <div className='text-left'>
                <span>الخصم:</span>
                <b>{order.discount || 0}</b>
              </div>
            </div>
          </div>

          <BuyAgain products={order.product} />

        </div>
      ))}

      <ToastContainer />
    </div>
  );
};

export default OrderDetails;
