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
(1, 'Rooftop Garden Initiative', 'Establish a community vegetable garden on an unused apartment rooftop and teach residents about sustainable urban farming.', 'Maplewood Apartments Community Center', '2026-04-18'),
(1, 'Neighborhood Seed Exchange', 'Host a seed-sharing event where residents can exchange locally adapted seeds and learn basic seed-saving techniques.', 'Eastside Community Library', '2026-05-09'),
(1, 'School Garden Workshop', 'Build raised garden beds at a local elementary school and introduce students to growing vegetables and herbs.', 'Lincoln Elementary School', '2026-05-23'),
(1, 'Community Compost Project', 'Create a neighborhood composting station and educate residents about reducing food waste through composting.', 'Riverside Neighborhood Park', '2026-06-06'),
(1, 'Summer Harvest Festival', 'Celebrate the community harvest with educational demonstrations, local produce, gardening activities, and cooking lessons.', 'Downtown Community Plaza', '2026-07-18'),
(2, 'Food Pantry Support Day', 'Recruit volunteers to organize donated food, prepare grocery boxes, and assist visitors at a local food pantry.', 'Hope Community Food Pantry', '2026-04-25'),
(2, 'Senior Home Assistance', 'Coordinate volunteers to help elderly residents with yard cleanup, minor household tasks, and seasonal preparations.', 'Westbrook Senior Community', '2026-05-16'),
(2, 'Community Clothing Drive', 'Collect, sort, and distribute gently used clothing to families and individuals experiencing financial hardship.', 'UnityServe Community Center', '2026-05-30'),
(2, 'River Cleanup Day', 'Organize volunteers to remove litter and debris from a local riverbank while promoting environmental stewardship.', 'Willow Creek River Trail', '2026-06-13'),
(2, 'Back-to-School Supply Drive', 'Collect backpacks, notebooks, pencils, and other school supplies for children from underserved families.', 'Central Community Center', '2026-08-01'),
(3, 'Community Garden Pavilion', 'Construct a sustainable covered pavilion using recycled and locally sourced materials for a neighborhood community garden.', 'Oakview Community Garden', '2026-04-11'),
(3, 'Accessible Park Improvements', 'Install accessible pathways, seating areas, and ramps to make a neighborhood park easier for residents with mobility challenges to use.', 'Meadowbrook Park', '2026-05-02'),
(3, 'Solar Bus Shelter Project', 'Build a solar-powered bus shelter with lighting and charging stations to improve comfort and safety for public transit users.', 'Main Street Transit Stop', '2026-06-20'),
(3, 'Community Center Renovation', 'Renovate an aging community center using energy-efficient lighting, sustainable materials, and improved insulation.', 'Northside Community Center', '2026-07-11'),
(3, 'Green Playground Construction', 'Replace outdated playground equipment with sustainably sourced materials and add natural shade and landscaping.', 'Sunrise Elementary School', '2026-08-15');


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
(2, 2), -- Rooftop Garden Initiative
(3, 2), -- Rooftop Garden Initiative
(1, 2), -- Rooftop Garden Initiative

(2, 3), -- Neighborhood Seed Exchange
(1, 3), -- Neighborhood Seed Exchange
(3, 3), -- Neighborhood Seed Exchange

(1, 4), -- School Garden Workshop
(2, 4), -- School Garden Workshop
(3, 4), -- School Garden Workshop

(2, 5), -- Community Compost Project
(1, 5), -- Community Compost Project

(1, 6), -- Summer Harvest Festival
(2, 6), -- Summer Harvest Festival

(1, 7), -- Food Pantry Support Day

(1, 8), -- Senior Home Assistance
(3, 8), -- Senior Home Assistance

(1, 9), -- Community Clothing Drive

(2, 10), -- River Cleanup Day
(1, 10), -- River Cleanup Day

(1, 11), -- Back-to-School Supply Drive

(3, 12), -- Community Garden Pavilion
(2, 12), -- Community Garden Pavilion

(3, 13), -- Accessible Park Improvements
(1, 13), -- Accessible Park Improvements

(3, 14), -- Solar Bus Shelter Project
(2, 14), -- Solar Bus Shelter Project

(3, 15), -- Community Center Renovation
(2, 15), -- Community Center Renovation

(3, 16), -- Green Playground Construction
(2, 16), -- Green Playground Construction
(1, 16); -- Green Playground Construction