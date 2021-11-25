INSERT INTO users(name,email,password)
values (DominicParks,victoriablackwell@outlook.com,$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.),
('EvaStanley', 'sebastianguerra@ymail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer' ,'jacksonrose@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties(owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code, active)
values (1 , 'Speed lamp' , 'description' ,'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350' , 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg' ,   930 , 6 ,4,   8 , 'Canada'  ,'536 Namsub Highway' , 'Sotboske' , 'Quebec', '28142' , 'true');

INSERT INTO reservations(guest_id, property_id,start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14'); 
 
 INSERT INTO PropertyReviews(guest_id,property_id,reservation_id,rating, message)
 VALUES (1,1,5,5,message)
 (2,3,4,6,message)
 (4,2,3,5,message);
