--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: master; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA master;


ALTER SCHEMA master OWNER TO postgres;

--
-- Name: miscellaneous; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA miscellaneous;


ALTER SCHEMA miscellaneous OWNER TO postgres;

--
-- Name: stations; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA stations;


ALTER SCHEMA stations OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: participants; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.participants (
    "userID" bigint NOT NULL,
    station text NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE master.participants OWNER TO postgres;

--
-- Name: stations; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.stations (
    name text NOT NULL,
    "groupID" bigint NOT NULL,
    "timeEach" double precision DEFAULT 10 NOT NULL,
    "frontMessage" text,
    "maxQueueLength" integer DEFAULT 10 NOT NULL,
    description text DEFAULT 'none provided'::text NOT NULL
);


ALTER TABLE master.stations OWNER TO postgres;

--
-- Name: COLUMN stations."timeEach"; Type: COMMENT; Schema: master; Owner: postgres
--

COMMENT ON COLUMN master.stations."timeEach" IS 'estimated time per person in minutes';


--
-- Name: COLUMN stations."frontMessage"; Type: COMMENT; Schema: master; Owner: postgres
--

COMMENT ON COLUMN master.stations."frontMessage" IS 'message to be sent to front participant';


--
-- Name: cache; Type: TABLE; Schema: miscellaneous; Owner: postgres
--

CREATE TABLE miscellaneous.cache (
    data text,
    key bigint NOT NULL,
    "time" timestamp with time zone
);


ALTER TABLE miscellaneous.cache OWNER TO postgres;

--
-- Name: 2084; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."2084" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."2084" OWNER TO postgres;

--
-- Name: 2am conversations; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."2am conversations" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."2am conversations" OWNER TO postgres;

--
-- Name: Are you speedy speedy?; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Are you speedy speedy?" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Are you speedy speedy?" OWNER TO postgres;

--
-- Name: Are you the present-day mozart?; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Are you the present-day mozart?" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Are you the present-day mozart?" OWNER TO postgres;

--
-- Name: Do you know who you are?; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Do you know who you are?" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Do you know who you are?" OWNER TO postgres;

--
-- Name: Feeling feelings; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Feeling feelings" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Feeling feelings" OWNER TO postgres;

--
-- Name: Hidden Beethovens; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Hidden Beethovens" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Hidden Beethovens" OWNER TO postgres;

--
-- Name: Pandora's Box; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Pandora's Box" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Pandora's Box" OWNER TO postgres;

--
-- Name: Spatial Interpersonal Test; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Spatial Interpersonal Test" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Spatial Interpersonal Test" OWNER TO postgres;

--
-- Name: Tembulingo: Language Learning 2.0; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."Tembulingo: Language Learning 2.0" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."Tembulingo: Language Learning 2.0" OWNER TO postgres;

--
-- Name: The Hearing; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations."The Hearing" (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations."The Hearing" OWNER TO postgres;

--
-- Name: Thor''s Body_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Are you speedy speedy?" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Thor''s Body_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Thor''s Linguistic_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."The Hearing" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Thor''s Linguistic_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Thor''s Musical_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Hidden Beethovens" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Thor''s Musical_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Thor's Existential_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."2am conversations" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Thor's Existential_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Tue Station 1_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Feeling feelings" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Tue Station 1_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Tue Station 2_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Spatial Interpersonal Test" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Tue Station 2_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Tue Station 3_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Do you know who you are?" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Tue Station 3_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Wed Linguistic_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Tembulingo: Language Learning 2.0" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Wed Linguistic_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Wed Music Station Admin_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Are you the present-day mozart?" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Wed Music Station Admin_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Wed Personal 2_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."2084" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Wed Personal 2_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: Wed Personal_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations."Pandora's Box" ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."Wed Personal_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1
);


--
-- Name: station1; Type: TABLE; Schema: stations; Owner: postgres
--

CREATE TABLE stations.station1 (
    "userID" bigint NOT NULL,
    "queueNumber" integer NOT NULL
);


ALTER TABLE stations.station1 OWNER TO postgres;

--
-- Name: station1_queueNumber_seq; Type: SEQUENCE; Schema: stations; Owner: postgres
--

ALTER TABLE stations.station1 ALTER COLUMN "queueNumber" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME stations."station1_queueNumber_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: participants; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.participants ("userID", station, "queueNumber") FROM stdin;
70681348	Wed Music	7
340628101	Wed Music	8
499898543	Wed Music	9
646785010	Wed Music	10
348939716	Wed Personal	8
126913124	Wed Linguistic	4
653421992	Wed Linguistic	5
542451018	Wed Personal	9
356312836	Wed Linguistic	6
740489610	Wed Linguistic	7
448252759	Thor's Musical	2
571587629	Thor's Musical	3
376289946	Thor's Musical	4
367913189	Thor's Existential	2
790145840	Thor's Existential	3
678101743	Thor's Existential	4
494271775	Spatial Interpersonal Test	1
\.


--
-- Data for Name: stations; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.stations (name, "groupID", "timeEach", "frontMessage", "maxQueueLength", description) FROM stdin;
station1	-440049325	5	you're next	5	none provided
Are you the present-day mozart?	-435377964	10	\N	10	none provided
Pandora's Box	-472564065	10	\N	10	none provided
2084	-468020530	20	\N	10	none provided
Tembulingo: Language Learning 2.0	-469688493	10	\N	10	none provided
The Hearing	-473066704	10	\N	10	none provided
Hidden Beethovens	-420749114	5	\N	10	none provided
Are you speedy speedy?	-350918507	10	\N	10	none provided
2am conversations	-492711691	10	\N	10	none provided
Feeling feelings	-338776699	10	\N	10	none provided
Spatial Interpersonal Test	-470598822	10	\N	10	none provided
Do you know who you are?	-339213979	10	\N	10	none provided
\.


--
-- Data for Name: cache; Type: TABLE DATA; Schema: miscellaneous; Owner: postgres
--

COPY miscellaneous.cache (data, key, "time") FROM stdin;
\.


--
-- Data for Name: 2084; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."2084" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: 2am conversations; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."2am conversations" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: Are you speedy speedy?; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Are you speedy speedy?" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: Are you the present-day mozart?; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Are you the present-day mozart?" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: Do you know who you are?; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Do you know who you are?" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: Feeling feelings; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Feeling feelings" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: Hidden Beethovens; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Hidden Beethovens" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: Pandora's Box; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Pandora's Box" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: Spatial Interpersonal Test; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Spatial Interpersonal Test" ("userID", "queueNumber") FROM stdin;
494271775	1
\.


--
-- Data for Name: Tembulingo: Language Learning 2.0; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."Tembulingo: Language Learning 2.0" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: The Hearing; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations."The Hearing" ("userID", "queueNumber") FROM stdin;
\.


--
-- Data for Name: station1; Type: TABLE DATA; Schema: stations; Owner: postgres
--

COPY stations.station1 ("userID", "queueNumber") FROM stdin;
\.


--
-- Name: Thor''s Body_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Thor''''s Body_queueNumber_seq"', 3, true);


--
-- Name: Thor''s Linguistic_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Thor''''s Linguistic_queueNumber_seq"', 4, true);


--
-- Name: Thor''s Musical_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Thor''''s Musical_queueNumber_seq"', 4, true);


--
-- Name: Thor's Existential_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Thor''s Existential_queueNumber_seq"', 4, true);


--
-- Name: Tue Station 1_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Tue Station 1_queueNumber_seq"', 1, true);


--
-- Name: Tue Station 2_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Tue Station 2_queueNumber_seq"', 1, true);


--
-- Name: Tue Station 3_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Tue Station 3_queueNumber_seq"', 1, false);


--
-- Name: Wed Linguistic_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Wed Linguistic_queueNumber_seq"', 9, true);


--
-- Name: Wed Music Station Admin_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Wed Music Station Admin_queueNumber_seq"', 11, true);


--
-- Name: Wed Personal 2_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Wed Personal 2_queueNumber_seq"', 11, true);


--
-- Name: Wed Personal_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."Wed Personal_queueNumber_seq"', 9, true);


--
-- Name: station1_queueNumber_seq; Type: SEQUENCE SET; Schema: stations; Owner: postgres
--

SELECT pg_catalog.setval('stations."station1_queueNumber_seq"', 49, true);


--
-- Name: stations master_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.stations
    ADD CONSTRAINT master_pkey PRIMARY KEY (name);


--
-- Name: participants participants_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.participants
    ADD CONSTRAINT participants_pkey PRIMARY KEY ("userID");


--
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: miscellaneous; Owner: postgres
--

ALTER TABLE ONLY miscellaneous.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- Name: Are you speedy speedy? Thor''s Body_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Are you speedy speedy?"
    ADD CONSTRAINT "Thor''s Body_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: The Hearing Thor''s Linguistic_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."The Hearing"
    ADD CONSTRAINT "Thor''s Linguistic_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: Hidden Beethovens Thor''s Musical_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Hidden Beethovens"
    ADD CONSTRAINT "Thor''s Musical_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: 2am conversations Thor's Existential_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."2am conversations"
    ADD CONSTRAINT "Thor's Existential_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: Feeling feelings Tue Station 1_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Feeling feelings"
    ADD CONSTRAINT "Tue Station 1_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: Spatial Interpersonal Test Tue Station 2_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Spatial Interpersonal Test"
    ADD CONSTRAINT "Tue Station 2_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: Do you know who you are? Tue Station 3_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Do you know who you are?"
    ADD CONSTRAINT "Tue Station 3_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: Tembulingo: Language Learning 2.0 Wed Linguistic_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Tembulingo: Language Learning 2.0"
    ADD CONSTRAINT "Wed Linguistic_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: Are you the present-day mozart? Wed Music Station Admin_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Are you the present-day mozart?"
    ADD CONSTRAINT "Wed Music Station Admin_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: 2084 Wed Personal 2_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."2084"
    ADD CONSTRAINT "Wed Personal 2_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: Pandora's Box Wed Personal_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations."Pandora's Box"
    ADD CONSTRAINT "Wed Personal_pkey" PRIMARY KEY ("queueNumber");


--
-- Name: station1 station1_pkey; Type: CONSTRAINT; Schema: stations; Owner: postgres
--

ALTER TABLE ONLY stations.station1
    ADD CONSTRAINT station1_pkey PRIMARY KEY ("queueNumber");


--
-- PostgreSQL database dump complete
--

