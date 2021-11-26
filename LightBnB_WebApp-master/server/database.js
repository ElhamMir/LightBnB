const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  email = email.toLowerCase();
  const params = [email];
  
  return pool.query(`SELECT * FROM users where email=$1`,params)
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const params = [id];
  
  return pool.query(`SELECT * FROM users where id=$1`,params)
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const params = [user.name,user.email,user.password];
  
  return pool.query(`INSERT INTO users(name,email,password) values ($1,$2,$3) returning *`,params)
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
   // 1
   const queryParams = [];
   // 2
   let queryString = `
   SELECT properties.*, avg(property_reviews.rating) as average_rating
   FROM properties
   JOIN property_reviews ON properties.id = property_id
   `;
 
   // 3
   if (options.city) {
     queryParams.push(`%${options.city}%`);
     queryString += `WHERE city LIKE $${queryParams.length} `;
   }
   if (options.owner_id) {
    queryParams.push(`%${options.owner_id}%`);
    queryString += `AND owner_id LIKE $${queryParams.length} `;
  }
  if (options.minimum_price_per_night) {
    queryParams.push(`%${options.minimum_price_per_night *100}%`);
    queryString += `AND cost_per_night >= $${queryParams.length} `;
  }
  if (options.maximum_price_per_night) {
    queryParams.push(`%${options.maximum_price_per_night *100}%`);
    queryString += `AND cost_per_night <= $${queryParams.length} `;
  }
  if (options.minimum_rating) {
    queryParams.push(`%${options.minimum_rating }%`);
    queryString += `AND property_reviews.rating >= $${queryParams.length} `;
  }
 
 
   // 4
   queryParams.push(limit);
   queryString += `
   GROUP BY properties.id
   ORDER BY cost_per_night
   LIMIT $${queryParams.length};
   `;
 
   // 5
   console.log(queryString, queryParams);
 
   // 6
   return pool.query(queryString, queryParams).then((res) => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  return pool
    .query(`SELECT * FROM properties LIMIT $1`, [limit])
    .then((result) => {
      console.log(result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const params = [properties.owner_id,properties.title , properties.description , properties.thumbnail_photo_url , properties.cover_photo_url , properties.cost_per_night , properties.street , properties.city , properties.province , properties.post_code ,properties.country , properties.parking_spaces , properties.number_of_bathrooms, properties.number_of_bedrooms ];
  
  return pool.query(`INSERT INTO properties(owner_id, title: string,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms)
    VALUES ($1, $2,$3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
    RETURNING *;`,params)
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });

  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
}
exports.addProperty = addProperty;
