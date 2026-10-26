// One swamp bank: every sound from the glow_toadstools, stilt_hut and mangrove_roots trials (ambience loops ship as their own files).
include("../2026-10-25-swamp-toadstools/toadstools.cx.js")
include("../2026-10-25-swamp-stilt_hut/stilt_hut.cx.js")
include("../2026-10-25-swamp-mangrove_roots/mangrove.cx.js")
bank("swamp_sfx", ["toadstool_squish", "spore_puff", "cap_drip", "door_creak", "ladder_step*", "board_creak", "root_splash", "leaf_rustle", "branch_creak", "toadstool_ambience", "hut_ambience", "mangrove_ambience"])
