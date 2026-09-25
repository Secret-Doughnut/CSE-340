create table organization (
	organization_id serial primary key,
	name varchar(255) not null,
	description text not null,
	contact_email varchar(255) not null,
	logo_filename varchar(255) not null
)

insert into organization 
(name, description, contact_email, logo_filename)
values
('GreenHarvest Growers',
'An urban farming collective promoting food sustainability and education in local neighborhoods.',
'contact@greenharvest.org',
'greenharvest-logo.png'),
('UnityServe Volunteers',
'A volunteer coordination group supporting local charities and service initiatives.',
'hello@unityserve.org',
'unityserve-logo.png'),
('BrightFuture Builders',
'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
'info@brightfuturebuilders.org',
'brightfuture-logo.png');


create table project (
	project_id serial primary key,
	organization_id integer,
	foreign key (organization_id) references organization(organization_id),
	title varchar(255) not null,
	description text not null,
	location varchar(255) not null,
	project_date date
)


INSERT INTO project (
    organization_id,
    title,
    description,
    location,
    project_date
)
VALUES
(1, 'Rooftop Garden Initiative', 'Establish a community vegetable garden on an unused apartment rooftop and teach residents about sustainable urban farming.', 'Maplewood Apartments Community Center', '2029-04-18'),
(1, 'Neighborhood Seed Exchange', 'Host a seed-sharing event where residents can exchange locally adapted seeds and learn basic seed-saving techniques.', 'Eastside Community Library', '2029-05-09'),
(1, 'School Garden Workshop', 'Build raised garden beds at a local elementary school and introduce students to growing vegetables and herbs.', 'Lincoln Elementary School', '2029-05-23'),
(1, 'Community Compost Project', 'Create a neighborhood composting station and educate residents about reducing food waste through composting.', 'Riverside Neighborhood Park', '2029-06-06'),
(1, 'Summer Harvest Festival', 'Celebrate the community harvest with educational demonstrations, local produce, gardening activities, and cooking lessons.', 'Downtown Community Plaza', '2029-07-18'),
(2, 'Food Pantry Support Day', 'Recruit volunteers to organize donated food, prepare grocery boxes, and assist visitors at a local food pantry.', 'Hope Community Food Pantry', '2029-04-25'),
(2, 'Senior Home Assistance', 'Coordinate volunteers to help elderly residents with yard cleanup, minor household tasks, and seasonal preparations.', 'Westbrook Senior Community', '2029-05-16'),
(2, 'Community Clothing Drive', 'Collect, sort, and distribute gently used clothing to families and individuals experiencing financial hardship.', 'UnityServe Community Center', '2029-05-30'),
(2, 'River Cleanup Day', 'Organize volunteers to remove litter and debris from a local riverbank while promoting environmental stewardship.', 'Willow Creek River Trail', '2029-06-13'),
(2, 'Back-to-School Supply Drive', 'Collect backpacks, notebooks, pencils, and other school supplies for children from underserved families.', 'Central Community Center', '2029-08-01'),
(3, 'Community Garden Pavilion', 'Construct a sustainable covered pavilion using recycled and locally sourced materials for a neighborhood community garden.', 'Oakview Community Garden', '2029-04-11'),
(3, 'Accessible Park Improvements', 'Install accessible pathways, seating areas, and ramps to make a neighborhood park easier for residents with mobility challenges to use.', 'Meadowbrook Park', '2029-05-02'),
(3, 'Solar Bus Shelter Project', 'Build a solar-powered bus shelter with lighting and charging stations to improve comfort and safety for public transit users.', 'Main Street Transit Stop', '2029-06-20'),
(3, 'Community Center Renovation', 'Renovate an aging community center using energy-efficient lighting, sustainable materials, and improved insulation.', 'Northside Community Center', '2029-07-11'),
(3, 'Green Playground Construction', 'Replace outdated playground equipment with sustainably sourced materials and add natural shade and landscaping.', 'Sunrise Elementary School', '2029-08-15');


create table category (
	category_id serial primary key,
	name varchar(255) not null
)

create table project_category (
	category_id integer,
	foreign key (category_id) references category(category_id),
	project_id integer,
	foreign key (project_id) references project(project_id),
    primary key (category_id, project_id)
)


insert into category (
	name
)
values
('Community Support'),
('Environmental & Sustainability'),
('Community Development');

INSERT INTO project_category (category_id, project_id)
VALUES
(2, 1), -- Rooftop Garden Initiative
(3, 1),
(1, 1),

(2, 2), -- Neighborhood Seed Exchange
(1, 2),
(3, 2),

(1, 3), -- School Garden Workshop
(2, 3),
(3, 3),

(2, 4), -- Community Compost Project
(1, 4),

(1, 5), -- Summer Harvest Festival
(2, 5),

(1, 6), -- Food Pantry Support Day

(1, 7), -- Senior Home Assistance
(3, 7),

(1, 8), -- Community Clothing Drive

(2, 9), -- River Cleanup Day
(1, 9),

(1, 10), -- Back-to-School Supply Drive

(3, 11), -- Community Garden Pavilion
(2, 11),

(3, 12), -- Accessible Park Improvements
(1, 12),

(3, 13), -- Solar Bus Shelter Project
(2, 13),

(3, 14), -- Community Center Renovation
(2, 14),

(3, 15), -- Green Playground Construction
(2, 15),
(1, 15);

create table roles (
	role_id serial primary key,
	role_name varchar(50) unique not null,
	role_description text
);

insert into roles (role_name, role_description)
values
('user', 'Standard user with basic access'),
('admin', 'Administrator with full system access');

create table users (
	user_id serial primary key,
	name varchar(100) not null,
	email varchar(100) unique not null,
	password_hash varchar(255) not null,
	role_id integer references roles(role_id),
	created_at timestamp default current_timestamp
);