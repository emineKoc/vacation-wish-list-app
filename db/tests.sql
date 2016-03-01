SELECT users.id, users.f_name,users.l_name,users.email, helper.name, helper.location, helper.description, helper.besttimetodo,  helper.category,  helper.image, helper.wish, helper.haveBeen
from
( SELECT id, name, location, description,besttimetodo,category, image , wishlist.user_id, wishlist.wish, wishlist.haveBeen
from attractions
left join wishlist
  on attractions.id = wishlist.attraction_id ) as helper
left join users
  on helper.user_id = users.id

-- my show all attractions query for my users.

for show all attraction table

SELECT helper.name, helper.location, helper.description, helper.besttimetodo,  helper.category,  helper.image, helper.wish, helper.haveBeen
from
( SELECT id, name, location, description,besttimetodo,category, image , wishlist.user_id, wishlist.wish, wishlist.haveBeen
from attractions
left join wishlist
  on attractions.id = wishlist.attraction_id ) as helper
left join users
  on helper.user_id = users.id
where helper.wish = false and helper.haveBeen = false and users.id = $1;

--show all for the spesific label:
"SELECT helper.name, helper.location, helper.description, helper.besttimetodo,  helper.category,  helper.image, helper.wish, helper.haveBeen from (SELECT id, name, location, description, besttimetodo,category, image , wishlist.user_id, wishlist.wish, wishlist.haveBeen from attractions left join wishlist on attractions.id = wishlist.attraction_id ) as helper left join users on helper.user_id = users.id where helper.wish = false and helper.haveBeen = false and users.id = $1;", [req.session.user.id],


DELETE  
from wishlist
where attraction.id = 4;
DELETE
from attractions
where if.id = 4;
