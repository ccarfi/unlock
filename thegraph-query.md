{
  keyPurchases(orderBy: timestamp, orderDirection: desc, first: 1000, where: { timestamp_gt: "1650344469" }) {
    timestamp
    lock
    id
  }
}
