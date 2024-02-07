# project_coffee
project_coffee
# figma:
https://www.figma.com/file/Ld6dttGhr2FODrAIsCsjBN/Project-Coffee?type=design&node-id=0-1&mode=design&t=sGfNiD7hBGyG6u6A-0

import erd in https://quick-erd.surge.sh/ : 
{"input":"# Visualize on https://erd.surge.sh\n# or https://quick-erd.surge.sh\n#\n# Relationship Types\n#  -    - one to one\n#  -<   - one to many\n#  >-   - many to one\n#  >-<  - many to many\n#  -0   - one to zero or one\n#  0-   - zero or one to one\n#  0-0  - zero or one to zero or one\n#  -0<  - one to zero or many\n#  >0-  - zero or many to one\n#\n////////////////////////////////////\nset\n---\nid integer PK\nname varchar\nprice float\n\nset_item_relation\n-----------------\nid integer PK\nitem_id integer FK >- item.id\nset_id integer FK >- set.id\n\n\noption_list\n-----------\nid\nname varchar\ncustom_option_id FK -< custom_option.id\n     \n\ncustom_option\n-----------\nid integer PK\nname varchar\nprice float\n     \n\ntype_option_list_relation\n------------------\nid integer PK\ntype_id integer FK >- type.id\noption_list_id FK >- option_list.id\n     \n\nitem\n----\nid integer PK\nname varchar\nitem_photo varchar 255\nsize varchar\nprice float\ndescription varchar 255\nis_enabled boolean\n\ntype\n-------------------------\nid integer PK\nname varchar\n     \n\nitem_type_relation\n------------------\nid integer PK\nitem_id integer FK >0- item.id\ntype_id integer FK >0- type.id\n\ncomment\n-------\nid integer PK\nrating integer\ndescription text\ntransaction_id integer FK - transaction.id\n     \n\norder\n-----\nid integer PK\nitem_id FK - item.id\nset_id FK - set.id \ntransaction_id FK \nsub_total integer\ncreated_at\nupdated_at\n     \n\norder_detail\n---------------\nid\norder_id FK - order.id\nitem_id FK - item.id\n     \n\norder_custom_option_relation\n----------------------------\nid\norder_detail_id FK - order_detail.id\ncustom_option_id FK - custom_option.id\n     \n\n\n\n\n\ntransaction\n-----------\nid integer PK\norder_time time\npickup_time time\npickup_status boolean\ntagged boolean\ntotal float\nstripe_id integer\nuser_id integer FK >- users.id\nshop_id integer FK >- shops.id\n\n\nmenu\n----\nid integer PK\nname integer\nlast_update timestamp\nphoto blob???\nshops_id integer FK - shops.id\n     \n\nmenu_category_relation\n----------------------\nid integer PK\ncategory_id integer FK >- category.id\nmenu_id integer FK >- menu.id\n\ncategory\n--------\nid integer PK\nname varchar\nicon varchar\ncategory_active_time_id integer FK >- category_active_time.id\n\n\ncategory_active_time\n----------------\nid integer PK\nday varchar\nstart_time time\nclose_time time\n\ncategory_item_relation\n----------------------\nid integer PK\ncategory_id integer FK >- category.id\nitem_id integer FK >- item.id\n     \n\ncategory_set_relation\n----------------------\nid integer PK\ncategory_id integer FK >- category.id\nset_id integer FK >- set.id\n\nshops\n-----\nid integer PK\ncontact_no varchar not null\narea varchar\ndistrict varchar\naddress text\ndescription text\nlogin_name varchar not null\nlogin_password varchar not null\nlatitude float\nlongitude float\n\n\nopening_days\n------------\nid integer PK\nday varchar\nstart_time time\nclose_time time\nshops_id integer FK >0- shops.id\n\nshop_photos\n-----------\nid integer PK\nfilename varchar\ncover_photo boolean\nlogo boolean\nshops_id integer FK >0- shops.id\n\nusers\n-----\nid integer PK\nemail text\ncontact_no varchar\nreward_points integer\nlogin_name varchar not null\nlogin_password varchar not null\n\nusers_visited_shops_relation\n----------------------\nid integer PK\nuser_id integer FK >- users.id\nshop_id integer FK >- shops.id\n\nkitchen\n-------\nid integer PK\ntransaction_done boolean\ntransaction_id integer FK >- transaction.id\n\n\n# zoom: 1.025\n# view: (690, 1902)\n# text-bg: #6495ed\n# text-color: #000000\n# diagram-bg: #f5f5f5\n# diagram-text: #000000\n# table-bg: #ffffff\n# table-text: #000000\n# set (1011, 272, #009600)\n# set_item_relation (1755, -51, #009600)\n# option_list (1130, 12, #b94fcf)\n# custom_option (963, -259, #ce3de1)\n# type_option_list_relation (1343, -178, #da0b0b)\n# item (1480, -894, #d1c323)\n# type (1345, -322)\n# item_type_relation (1475, -457, #d11010)\n# comment (-322, -874)\n# order (360, -931, #ebac00)\n# order_detail (842, -817, #c0d651)\n# order_custom_option_relation (974, -525, #f51414)\n# transaction (57, -814)\n# menu (153, 119)\n# menu_category_relation (197, -84, #d51010)\n# category (278, -320)\n# category_active_time (499, 147)\n# category_item_relation (321, -519)\n# category_set_relation (530, 354)\n# shops (-582, 110)\n# opening_days (-87, -77)\n# shop_photos (-75, 295)\n# users (-479, -454)\n# users_visited_shops_relation (-587, -170, #ec1818)\n# kitchen (-394, -641)","zoom":1.024635744,"view:x":{"_value":690,"key":"view:x","defaultValue":0},"view:y":{"_value":1902,"key":"view:y","defaultValue":0},"set-x":{"_value":1011,"key":"set-x","defaultValue":0},"set-y":{"_value":272,"key":"set-y","defaultValue":0},"set_item_relation-x":{"_value":1755,"key":"set_item_relation-x","defaultValue":0},"set_item_relation-y":{"_value":-51,"key":"set_item_relation-y","defaultValue":0},"option_list-x":{"_value":1130,"key":"option_list-x","defaultValue":0},"option_list-y":{"_value":12,"key":"option_list-y","defaultValue":0},"custom_option-x":{"_value":963,"key":"custom_option-x","defaultValue":0},"custom_option-y":{"_value":-259,"key":"custom_option-y","defaultValue":0},"type_option_list_relation-x":{"_value":1343,"key":"type_option_list_relation-x","defaultValue":0},"type_option_list_relation-y":{"_value":-178,"key":"type_option_list_relation-y","defaultValue":0},"item-x":{"_value":1480,"key":"item-x","defaultValue":0},"item-y":{"_value":-894,"key":"item-y","defaultValue":0},"type-x":{"_value":1345,"key":"type-x","defaultValue":0},"type-y":{"_value":-322,"key":"type-y","defaultValue":0},"item_type_relation-x":{"_value":1475,"key":"item_type_relation-x","defaultValue":0},"item_type_relation-y":{"_value":-457,"key":"item_type_relation-y","defaultValue":0},"comment-x":{"_value":-322,"key":"comment-x","defaultValue":0},"comment-y":{"_value":-874,"key":"comment-y","defaultValue":0},"order-x":{"_value":360,"key":"order-x","defaultValue":0},"order-y":{"_value":-931,"key":"order-y","defaultValue":0},"order_detail-x":{"_value":842,"key":"order_detail-x","defaultValue":0},"order_detail-y":{"_value":-817,"key":"order_detail-y","defaultValue":0},"order_custom_option_relation-x":{"_value":974,"key":"order_custom_option_relation-x","defaultValue":0},"order_custom_option_relation-y":{"_value":-525,"key":"order_custom_option_relation-y","defaultValue":0},"transaction-x":{"_value":57,"key":"transaction-x","defaultValue":0},"transaction-y":{"_value":-814,"key":"transaction-y","defaultValue":0},"menu-x":{"_value":153,"key":"menu-x","defaultValue":0},"menu-y":{"_value":119,"key":"menu-y","defaultValue":0},"menu_category_relation-x":{"_value":197,"key":"menu_category_relation-x","defaultValue":0},"menu_category_relation-y":{"_value":-84,"key":"menu_category_relation-y","defaultValue":0},"category-x":{"_value":278,"key":"category-x","defaultValue":0},"category-y":{"_value":-320,"key":"category-y","defaultValue":0},"category_active_time-x":{"_value":499,"key":"category_active_time-x","defaultValue":0},"category_active_time-y":{"_value":147,"key":"category_active_time-y","defaultValue":0},"category_item_relation-x":{"_value":321,"key":"category_item_relation-x","defaultValue":0},"category_item_relation-y":{"_value":-519,"key":"category_item_relation-y","defaultValue":0},"category_set_relation-x":{"_value":530,"key":"category_set_relation-x","defaultValue":0},"category_set_relation-y":{"_value":354,"key":"category_set_relation-y","defaultValue":0},"shops-x":{"_value":-582,"key":"shops-x","defaultValue":0},"shops-y":{"_value":110,"key":"shops-y","defaultValue":0},"opening_days-x":{"_value":-87,"key":"opening_days-x","defaultValue":0},"opening_days-y":{"_value":-77,"key":"opening_days-y","defaultValue":0},"shop_photos-x":{"_value":-75,"key":"shop_photos-x","defaultValue":0},"shop_photos-y":{"_value":295,"key":"shop_photos-y","defaultValue":0},"users-x":{"_value":-479,"key":"users-x","defaultValue":0},"users-y":{"_value":-454,"key":"users-y","defaultValue":0},"users_visited_shops_relation-x":{"_value":-587,"key":"users_visited_shops_relation-x","defaultValue":0},"users_visited_shops_relation-y":{"_value":-170,"key":"users_visited_shops_relation-y","defaultValue":0},"kitchen-x":{"_value":-394,"key":"kitchen-x","defaultValue":0},"kitchen-y":{"_value":-641,"key":"kitchen-y","defaultValue":0}}
#let's go boyzzzz!
