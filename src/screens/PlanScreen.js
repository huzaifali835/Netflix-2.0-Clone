import React, { useState, useEffect } from "react";
import db from "../firebase";
import "./PlanScreen.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

const Plans = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState([]);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async subscription => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        //Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        //We have a session, let's redirect to Checkout
        //Init Stripe
        const stripe = await loadStripe(
          "pk_test_51JdlWsB7KpGGrW4qPh40k0ZojBFGa5BXXHhdvHUBJ4rPJJAFsjkgPncNEAffwLd2TKN6nBp7vNxU3RZVkWCymhSW00aIpswi24"
        );
        stripe.redirectToCheckout({ sessionId });        
      }
    });
  };


  return (
    <div className="plansScreen">
      <br></br>
       {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
      {Object.entries(products).map(([productId, productData]) => {
          //Check is user's subscription is active
          const isCurrentPlan = productData.name?.toLowerCase().includes(subscription?.role);
        return (
          <div key={productId} className={`${isCurrentPlan && "plansScreen_disabled"} plansScreen_plan`}>
            <div className="plansScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => !isCurrentPlan && loadCheckout(productData.prices.priceId)}>
              {isCurrentPlan ? 'Current Plan' : 'Subscribe'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Plans;