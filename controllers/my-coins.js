const { findById } = require("../models/my-coins");
const MyCoins = require("../models/my-coins");

const mycoinsGet = async (req, res) => {
  const [total, coins] = await Promise.all([
    MyCoins.countDocuments(),
    MyCoins.find().populate("usuario", "name"),
  ]);
  res.status(400).json({
    total,
    coins,
  });
};

const mycoinGet = async (req, res) => {
  const { id } = req.params;
  const coin = await MyCoins.find({ id });
  res.json(coin);
};

const myCoinsPost = async (req, res) => {
  const { name, coin, usuario } = req.body;

  const existe = await MyCoins.findOne({ name });
  try {
    if (existe) {
      const update = await MyCoins.findOneAndUpdate(
        { name },
        {
          coin: {
            amount: Number(coin.amount) + existe.coin.amount,
            price: Number(coin.price) + existe.coin.price,
          },
        }
      );
    } else {
      const data = {
        name,
        coin: {
          amount: Number(coin.amount),
          price: Number(coin.price),
        },
        usuario,
      };
      const mycoins = await MyCoins(data);
      await mycoins.save();
    }
  } catch (error) {
    console.log(error);
  }
};
const myCoinsPut = async (req, res) => {
  const { id } = req.params;
  const { name, ...rest } = req.body;
  const existe = await MyCoins.findById(id);
  if((existe.coin.amount - rest.coin.amount)>0){
    const userCoin = await MyCoins.findByIdAndUpdate(id, {
      coin: {
        amount: existe.coin.amount - rest.coin.amount,
        price: existe.coin.price - (rest.coin.price * rest.coin.amount)
      },
    });
  }
  if((existe.coin.amount - rest.coin.amount)==0){
    const userCoin = await MyCoins.findByIdAndDelete(id)
  }
 
};

const myCoinsDelete = async (req, res) => {
  const { id, uid } = req.params;
  const coin = await MyCoins.findByIdAndUpdate(
    id,
    { $pull: { coin: { _id: uid } } },
    { multi: true }
  );
  res.json(coin);
};

module.exports = {
  mycoinsGet,
  mycoinGet,
  myCoinsPost,
  myCoinsPut,
  myCoinsDelete,
};

// {
//   $set: {
//     "coin.$[cn].price": rest.price,
//     "coin.$[cn].amount": rest.amount,
//   },
// },
// {
//   arrayFilters: [
//     {
//       "cn._id": rest.usuario,
//     },
//   ],
// }
