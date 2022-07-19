import * as React from 'react';
import {
    Typography, Grid, CardMedia, Card, Paper, CardContent,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import {
    ChevronLeft, ChevronRight, CollectionsBookmark, People, Receipt,
} from '@mui/icons-material';
import libraryPage from '../images/homepage/libraryPage.png';
import bookListPage from '../images/homepage/bookListPage.png';
import bookPage from '../images/homepage/bookAddEditPage.png';
import authorListPage from '../images/homepage/authorListPage.png';
import authorPage from '../images/homepage/authorAddEditPage.png';
import ordersPage from '../images/homepage/ordersPage.png';

const Home = () => (
    <Grid item xs={12}>
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '50px', marginBottom: '50px' }}>
                <Typography variant="h2">
                    Welcome to Apollo&apos;s Library
                </Typography>
            </Grid>
        </Grid>
        <Grid container spacing={4}>
            <Grid item xs={2} />
            <Grid item xs={8}>
                <Paper
                    variant="elevation"
                    elevation={24}
                    sx={{
                        background: '#6262D0',
                        marginBottom: '100px',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        height: '400px',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h3"
                                sx={{
                                    textAlign: 'center',
                                    color: '#FFFFFF',
                                    paddingTop: '20px',
                                    paddingBottom: '20px',
                                }}
                            >
                                Using Apollo&apos;s Library
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ minHeight: '360px', marginLeft: '30px', marginRight: '30px' }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4">
                                        <People sx={{
                                            height: '100px', width: '100px', marginTop: '20px', marginBottom: '20px',
                                        }}
                                        />
                                    </Typography>
                                    <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                                        Community Driven Content
                                    </Typography>
                                    <Typography variant="body1">
                                        All of the source data for your library is added by your fellow librarians. So if you need to add an obscure book good chance it&apos;s already there. Content is moderated by your fellow librarians.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ minHeight: '360px', marginLeft: '30px', marginRight: '30px' }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4">
                                        <CollectionsBookmark sx={{
                                            height: '100px', width: '100px', marginTop: '20px', marginBottom: '20px',
                                        }}
                                        />
                                    </Typography>
                                    <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                                        Collection Tracking
                                    </Typography>
                                    <Typography variant="body1">
                                        Using the content generted by the librarians of the site you will be able to track your collection.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ minHeight: '360px', marginLeft: '30px', marginRight: '30px' }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4">
                                        <Receipt sx={{
                                            height: '100px', width: '100px', marginTop: '20px', marginBottom: '20px',
                                        }}
                                        />
                                    </Typography>
                                    <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                                        Budgeting
                                    </Typography>
                                    <Typography variant="body1">
                                        As well as being able to track your collection you will have the ability to track your spending. This will help you track your book spending budget and adjust as needed.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={2} />
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: '50px', marginBottom: '100px' }}>
            <Grid item xs={2} />
            <Grid item xs={8}>
                <Carousel NextIcon={<ChevronRight />} PrevIcon={<ChevronLeft />}>
                    <CardMedia src={libraryPage} component="img" />
                    <CardMedia src={ordersPage} component="img" />
                    <CardMedia src={bookListPage} component="img" />
                    <CardMedia src={bookPage} component="img" />
                    <CardMedia src={authorListPage} component="img" />
                    <CardMedia src={authorPage} component="img" />
                </Carousel>
            </Grid>
            <Grid item xs={2} />
        </Grid>
    </Grid>
);

export default Home;
