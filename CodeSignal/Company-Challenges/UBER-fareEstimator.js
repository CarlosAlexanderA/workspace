function solution(ride_time, ride_distance, cost_per_minute, cost_per_mile) {
  return cost_per_mile.map((mileCost, index) => {
    const rideMinuteCost = cost_per_minute[index];

    return rideMinuteCost * ride_time + mileCost * ride_distance;
  });
}

// (cost_per_minute) * (ride time) + (cost_per_mile) * (ride_distance)
