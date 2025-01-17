import { StyleSheet } from "react-native";

export const general = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#3483fa",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
    fontSize: 14,
    lineHeight: 18,
  },
  center: {
    marginTop:200,
    alignSelf:"center",
    justifyContent:"center"
  },
  loading: {
    width: 50,
    height: 50,
  }
});

export const padding = StyleSheet.create({
    xs: {
      padding: 10,
    }
  });

export const body = StyleSheet.create({
    white: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
    }
});

export const productStyles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  owner: {
    fontSize: 14,
    color: "#666666",
  },
  dues: {
    fontSize: 14,
    fontWeight: '300',
    color: "#00A650",
  },
  shipping: {
    fontSize: 16,
    paddingTop: 15,
  },
  price: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export const formStyles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: "#00000040",
    borderBottomWidth: 1,
  },
  label: {
    marginTop: 10,
  },
  input: {
    padding: 10,
    borderRadius: 3,
    shadowColor: "#00000026",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
  error: {
    color: "red",
    textAlign: "center",
    padding: 5,
  }
});

export const cartStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 5,
  },
  priceDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
    gap: 16,
    marginTop: 16,
  },
  shippingPrices: {
    fontSize: 18,
  },
  totalPrices: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyCart: {
    margin: 16,
    alignItems: 'center',
    padding: 100,
  },
  emptyCartText: { 
    fontSize: 24, 
    textAlign: 'center', 
    marginBottom: 16,
  },
  emptyCartLink: {
    color:'#3483FA',
    paddingTop: 16,
  }
});