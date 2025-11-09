import React, { useState } from 'react';

const seatTypes = {
  A: 'regular',
  B: 'regular',
  C: 'premium',
  D: 'premium',
  E: 'premium',
  F: 'vip',
  G: 'vip',
  H: 'vip',
};
const typeColors = {
  regular: '#e0e0e0',
  premium: '#82caff',
  vip: '#ffe066',
  booked: '#ff3333',
  selected: '#5be96a',
};
const ticketPrices = {
  regular: 150,
  premium: 200,
  vip: 300,
};

function generateSeats() {
  const rows = 'ABCDEFGH';
  const seats = [];
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    for (let n = 1; n <= 12; n++) {
      seats.push({
        id: `${row}${n}`,
        row,
        num: n,
        type: seatTypes[row],
        booked: false,
        selected: false,
      });
    }
  }
  return seats;
}

export default function TicketBooking() {
  const [seats, setSeats] = useState(generateSeats());
  const [selected, setSelected] = useState([]);

  function handleSelect(id) {
    setSeats(seats =>
      seats.map(seat =>
        seat.id === id && !seat.booked
          ? { ...seat, selected: !seat.selected }
          : seat
      )
    );
    setSelected(sel =>
      sel.includes(id)
        ? sel.filter(s => s !== id)
        : [...sel, id]
    );
  }

  function handleBook() {
    setSeats(seats =>
      seats.map(seat =>
        selected.includes(seat.id)
          ? { ...seat, booked: true, selected: false }
          : seat
      )
    );
    setSelected([]);
  }

  function renderRow(row) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        margin: '8px 0',
        justifyContent: 'center'
      }} key={row}>
        <span style={{ width: 30, textAlign: 'right', marginRight: 10, fontWeight: 'bold' }}>{row}</span>
        {seats.filter(seat => seat.row === row).map(seat => (
          <button
            key={seat.id}
            disabled={seat.booked}
            onClick={() => handleSelect(seat.id)}
            style={{
              background: seat.booked
                ? typeColors.booked
                : seat.selected
                  ? typeColors.selected
                  : typeColors[seat.type],
              border: '1px solid #999999ff',
              borderRadius: 8,
              width: 55,
              height: 55,
              margin: '0 7px',
              fontSize: 18,
              cursor: seat.booked ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              color: '#222'
            }}
            title={seat.id}
          >
            {seat.num}
          </button>
        ))}
      </div>
    );
  }

  const selectedDetails = seats.filter(seat => selected.includes(seat.id));
  const totalPrice = selectedDetails.reduce((sum, seat) => sum + ticketPrices[seat.type], 0);

  return (
    <div style={{
      maxWidth: '1200px',
      margin: 'auto',
      fontFamily: 'sans-serif',
      border: '2px solid black',      // <--- Black border added here
      borderRadius: '8px',            // <--- Optional, for rounded corners
      boxSizing: 'border-box'
    }}>
      {/* Heading */}
      <header style={{
        textAlign: 'center',
        margin: '36px 0 10px 0',
        fontSize: '2.5rem',
        fontWeight: 'bold'
      }}>
        TicketBooking App
      </header>
      {/* Screen bar */}
      <div style={{
        background: '#eee',
        borderRadius: 12,
        margin: 'auto',
        height: 20,
        width: '90%',
      }} />
      <div style={{
        textAlign: 'center',
        marginBottom: 24,
        fontSize: '1.5rem',
        letterSpacing: 2,
        fontWeight: 500
      }}>
        Screen
      </div>
      {/* Seat grid */}
      <div style={{
        marginTop: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {'ABCDEFGH'.split('').map(renderRow)}
      </div>
      {/* Ticket details centered */}
      {selected.length > 0 && (
        <div style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 18,
          width: "100%",
          margin: "30px auto 0 auto"
        }}>
          Selected Seats:&nbsp;
          {selectedDetails.map(seat =>
            <span key={seat.id} style={{ margin: "0 7px", fontWeight: 'normal' }}>
              {seat.id} (₹{ticketPrices[seat.type]})
            </span>
          )}
          &nbsp;|&nbsp;
          Total: <span style={{ color: "#0066ee" }}>₹{totalPrice}</span>
          <br />
          <button
            onClick={handleBook}
            style={{
              background: '#0066ee',
              color: '#fff',
              padding: '10px 28px',
              fontWeight: 'bold',
              fontSize: 16,
              border: 'none',
              borderRadius: 6,
              margin: '16px 0 0 0',
              cursor: 'pointer'
            }}
          >
            Book Selected
          </button>
        </div>
      )}
      {/* Legend and no selected seat row */}
      <div style={{
        width: '100%',
        marginTop: 26,
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: 28,
        height: 38
      }}>
        {/* No Selected Seat (left, slightly lower than legend) */}
        {selected.length === 0 && (
          <div style={{
            fontWeight: 'normal',
            color: "#222",
            fontSize: 16,
            marginLeft: 20,
            marginTop: 16,
            minWidth: 180
          }}>
            No Selected Seat
          </div>
        )}
        {/* Legend centered */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 38,
          fontSize: 17,
        }}>
          <span><span style={{ background: '#e0e0e0', borderRadius: 5, padding: '0 13px', border: '1px solid #999' }}>&nbsp;</span> Regular(₹150)</span>
          <span><span style={{ background: '#82caff', borderRadius: 5, padding: '0 13px', border: '1px solid #999' }}>&nbsp;</span> Premium(₹200)</span>
          <span><span style={{ background: '#ffe066', borderRadius: 5, padding: '0 13px', border: '1px solid #999' }}>&nbsp;</span> VIP(₹300)</span>
          <span><span style={{ background: '#ff3333', borderRadius: 5, padding: '0 13px', border: '1px solid #999' }}>&nbsp;</span> Booked</span>
        </div>
      </div>
    </div>
  );
}
