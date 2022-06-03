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
  try{
    if (existe) {
      const update = await MyCoins.findOneAndUpdate(
        { name },
        {
          $push: {
            coin: [
              {
                amount: Number(coin[0].amount),
                price: Number(coin[0].price),
              },
            ],
          },
        }
      );
     
    } else {
      const data = {
        name,
        coin: [
          {
            amount: Number(coin[0].amount),
            price: Number(coin[0].price),
          },
        ],
        usuario,
      };
      const mycoins = await MyCoins(data);
      await mycoins.save();
     
    }
  }catch(error){
    console.log(error)
  }

};
const myCoinsPut = async (req, res) => {
  const { id, uid } = req.params;
  const { _id, name, ...rest } = req.body;
  const coin = await MyCoins.findByIdAndUpdate(
    id,
    {
      $set: {
        "coin.$[cn].price": rest.price,
        "coin.$[cn].amount": rest.amount,
      },
    },
    {
      arrayFilters: [
        {
          "cn._id": uid,
        },
      ],
    }
  );
  res.json(coin);
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
