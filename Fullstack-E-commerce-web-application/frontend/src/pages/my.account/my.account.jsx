import { useContext, useEffect } from "react";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { AuthContext } from "../../contexts/auth.context";
import "./my.css";
import OrderService from "../../api-service/order.service";
import Loading from "../../components/loading/loading";
import Info from "../../components/info/info";

function MyAccount() {
  const { user, toggleUser } = useContext(AuthContext);
  const { isLoading, userOrders, getOrdersByUser } = OrderService();

  return (
    <>
      <Header />
      <ProfileCard user={user} />
      {isLoading && <Loading />}
      {!isLoading && <OrderList orders={userOrders} />}
      <Footer />
    </>
  );
}

export default MyAccount;

function ProfileCard({ user }) {
  return (
    <section className="profile-card">
      <h3>
        ¡Bienvenido de nuevo {user?.username}! <span>({user?.email})</span>
      </h3>
    </section>
  );
}

function OrderList({ orders }) {
  return (
    <>
      {orders.length === 0 && (
        <Info message="¡Aún no has realizado ningún pedido!" />
      )}

      {orders.length !== 0 && (
        <>
          <div className="orders">
            <h2>Mis pedidos</h2>

            {orders.map((order) => {
              return (
                <div className="order" key={order.id}>
                  <div>
                    <div>Pedido #{order.id}</div>
                    <div>
                      Realizado el {order.placedOn.split("T")[0]} a las{" "}
                      {order.placedOn.split("T")[1]}
                    </div>
                  </div>
                  <div className="items">
                    {order.orderItems.map((item) => {
                      return (
                        <div key={item.productId}>
                          <img
                            src={`${item.imageUrl}`}
                            alt={item.productName}
                          />
                          <div>
                            <div>{item.productName}</div>
                            <div>
                              Rs. {item.price} x {item.quantity}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <div>Total: $. {order.orderAmt}</div>
                    <div>Estado del pedido: {order.orderStatus}</div>
                    <div>Estado del pago: {order.paymentStatus}</div>
                    <div>
                      Dirección de envío: {order.addressLine1}{" "}
                      {order.addressLine2}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
