export default function AuctionNewForm(props) {
  const getDataAndSubmit = (event) => {
    event.preventDefault();
    const { currentTarget } = event;
    const fd = new FormData(currentTarget);

    props.submitForm({
      title: fd.get("title"),
      description: fd.get("description"),
      ends_at: fd.get("ends_at"),
      reserve_price: fd.get("reserve_price"),
    });
    currentTarget.reset();
  };

  return (
    <form
      className="NewAuctionForm ui form"
      onSubmit={getDataAndSubmit}
    >
      <div className="field">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" required />
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" rows="3" required />
      </div>
      <div className="field">
        <label htmlFor="ends_at">Ends at</label>
        <input type="date" name="ends_at" id="ends_at" required />
      </div>
      <div className="field">
        <label htmlFor="reserve_price">Reserve Price</label>
        <input type="number" name="reserve_price" id="reserve_price" required />
      </div>
      <button className="ui orange button" type="submit">
        Create Auction
      </button>
    </form>
  );
}
